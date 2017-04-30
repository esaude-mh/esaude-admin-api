'use strict';

const fs = require('fs');
const path = require('path');
const constants = require('../constants');
const mysqldump = require('mysqldump');
const archiver = require('archiver');

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

    res.json({
      database
    });
  },

  // return a specific backup file
  get: (req, res) => {
    res.json({
      neverGonna: 'letYouDown'
    });
  },

  // create a backup
  create: (req, res) => {
    let date = new Date();
    let message = 'Backup successfully created';

    let dumpfile = 'esaude-platform-backup-' +
      `${('0' + date.getDate()).slice(-2)}-` +
      `${('0' + (date.getMonth() + 1)).slice(-2)}-` +
      `${date.getFullYear()}-` +
      `${('0' + date.getHours()).slice(-2)}h` +
      `${('0' + date.getMinutes()).slice(-2)}m` +
      `${('0' + date.getSeconds()).slice(-2)}s.sql`;

    mysqldump({
      host: constants.esaudeDatabaseHost,
      user: constants.esaudeDatabaseUser,
      password: constants.esaudeDatabasePass,
      database: constants.esaudeDatabaseName,
      ifNotExist: true,
      dest: constants.databaseBackupPath + path.sep + dumpfile
    }, function(err) {
      if (err) {
        message = err.message;
        res.status(500);
      } else {
        // compress the dump
        const output = fs.createWriteStream(constants.databaseBackupPath + path.sep + dumpfile + '.zip');
        const archive = archiver('zip', {
          zlib: {
            level: 9
          } // Sets the compression level.
        });

        archive.on('error', function(err) {
          message = err.message;
          res.status(500);
        });

        archive.pipe(output);

        archive.file(constants.databaseBackupPath + path.sep + dumpfile);

        archive.finalize();

        // delete uncompressed dump
        output.on('close', function() {
          fs.unlinkSync(constants.databaseBackupPath + path.sep + dumpfile);
        });
      }

      res.json({
        message: message
      });
    })
  }
};
