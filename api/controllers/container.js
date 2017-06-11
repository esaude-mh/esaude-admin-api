'use strict';

const fs = require('fs');
const path = require('path');
const constants = require('../constants');
const Docker = require('dockerode');
const moment = require('moment');

module.exports = {
  // return list all containers
  getAllContainers: (req, res) => {

    const docker = new Docker({
      socketPath: constants.dockerSocketPath
    });

    const containers = [];

    docker.listContainers({
      all: true
    }, function(err, containerList) {
      containerList.forEach(function(containerInfo) {

        // parse image info
        let imageArray = containerInfo.Image.split(/[\/:]/);

        let image = {
          registry: undefined,
          name: undefined,
          version: undefined,
        };

        if (imageArray.length === 1) { // we only have the name
          image.name = imageArray[0];
        } else if (imageArray.length === 2) { // we have the name and version
          image.name = imageArray[0];
          image.version = imageArray[1];
        } else if (imageArray.length === 3) { // we hace the registry, name and version
          image.registry = imageArray[0];
          image.name = imageArray[1];
          image.version = imageArray[2];
        }

        // parse port info
        let portInfo = containerInfo.Ports;

        let ports = portInfo.map((port) => {
          return {
            ip: port.IP,
            private: port.PrivatePort,
            public: port.PublicPort,
            protocol: port.Type,
          }
        });

        // parse mounts
        let mounts = containerInfo.Mounts.map((mount) => {
          return {
            type: mount.Type,
            name: mount.Name,
            source: mount.Source,
            destination: mount.Destination,
          }
        });

        // assemble container object
        let container = {
          id: containerInfo.Id,
          name: containerInfo.Names[0].substring(1), // this could be better
          image,
          ports,
          networks: containerInfo.NetworkSettings.Networks.keys,
          mounts,
          created: {
            timestamp: containerInfo.Created,
            display: moment.unix(containerInfo.Created).fromNow(),
          },
          state: containerInfo.State,
          status: containerInfo.Status,
        };

        // add to container list
        containers.push(container);
      });

      res.json(containers);
    });
  }
};
