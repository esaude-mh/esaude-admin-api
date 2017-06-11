'use strict';

const dockerService = require('../service/docker');
const constants = require('../constants');

module.exports = {
  // gets app from list or creates it
  getApp: (appList, appId) => {
    let matches = appList.filter((el) => {
      return el.id === appId;
    });

    if (matches.length === 0) {
      let app = {
        id: appId,
        containers: []
      }
      appList.push(app);
      return app;
    } else {
      return matches[0];
    }
  },

  // builds app list from containers
  buildAppList: (containers) => {
    const apps = [];

    constants.esaudeApps.forEach((app) => {
      containers.forEach((container) => {
        if (app.containers.includes(container.name)) {

          let appContainer = module.exports.getApp(apps, app.id);

          // there's a better way to not have to repeat this
          appContainer.name = app.name;
          appContainer.version = container.image.version;

          appContainer.containers.push(container);
        }
      });
    });

    return apps;
  },

  // return list all apps
  getAllApps: (req, res) => {
    dockerService.getAllContainers().then((containers) => {
      res.json(module.exports.buildAppList(containers));
    }).catch(err => {
      res.status(500);
      res.json({
        message: err.message
      })
    });
  }
};
