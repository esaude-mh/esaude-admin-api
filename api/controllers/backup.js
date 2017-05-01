'use strict';

const fs = require('fs');
const path = require('path');
const constants = require('../constants');
const Docker = require('dockerode');

module.exports = {

  // return list of backed up files
  getAll: (req, res) => {

    const database = [];

    // list datbase backups
    const files = fs.readdirSync(constants.databaseBackupPath);

    let stat;
    files.forEach(file => {
      stat = fs.statSync(constants.databaseBackupPath + path.sep + file);

      database.push({
        filename: file,
        size: stat.size,
        created: stat.ctime.toISOString()
      })
    })

    database.sort((a, b) => {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });

    res.json({
      database
    });
  },

  // return a specific backup file
  get: (req, res) => {
    const backup = req.swagger.params.filename.value;

    if (fs.existsSync(constants.databaseBackupPath + path.sep + backup)) {
      res.download(constants.databaseBackupPath + path.sep + backup)
    } else {
      res.status(500);
      res.json({
        message: 'Backup file not found'
      });
    }
  },

  // create a backup
  create: (req, res) => {

    const docker = new Docker({
      socketPath: constants.dockerSocketPath
    });

    const esaudePlatformMySQL = docker.getContainer(constants.esaudeDatabaseHost);

    const execOptions = {
      Cmd: ['backup'],
      AttachStdout: true,
      AttachStderr: true
    };

    const respond = function(err) {
      let message = 'Backup successfully created';
      if (err) {
        console.log(err);
        res.status(500);
        message = err.message;
      }

      res.json({
        message: message
      });
    };

    esaudePlatformMySQL.exec(execOptions, (err, exec) => {
      if (err)
        return respond(err);

      exec.start((err, stream) => {
        if (err)
          return respond(err);

        esaudePlatformMySQL.modem.demuxStream(stream, process.stdout, process.stderr);

        stream.on('end', () => {
          exec.inspect(function(err, data) {
            if (!err && !data.Running) {
              if (err)
                return respond(err);

              if (data.ExitCode == 0) {
                return respond();
              } else {
                return respond({
                  message: `Backup exited with response code ${data.ExitCode}`
                })
              }
            }
          });
        });

      });
    });
  }
};
