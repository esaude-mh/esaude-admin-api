'use strict';

const dockerService = require('../service/docker');

module.exports = {
  // return list all containers
  getAllContainers: (req, res) => {
    dockerService.getAllContainers().then((containers) => {
      res.json(containers);
    });
  }
};
