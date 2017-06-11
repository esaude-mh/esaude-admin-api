'use strict';

module.exports = {
  databaseBackupPath: '/opt/esaude/data/backups/database',
  modulesBackupPath: '/opt/esaude/data/backups/modules',
  warBackupPath: '/opt/esaude/data/backups/war',
  bundleBackupPath: '/opt/esaude/data/backups/bundle',

  esaudeDatabaseHost: 'esaude-platform-mysql',
  esaudeDatabaseName: 'openmrs',
  esaudeDatabaseUser: 'esaude',
  esaudeDatabasePass: 'eSaudeUserMySQLPassword',

  esaudeApps: [{
      id: 'platform',
      name: 'eSaude EMR Platform',
      containers: ['esaude-platform-mysql', 'esaude-platform-tomcat']
    },
    {
      id: 'poc',
      name: 'eSaude EMR POC',
      containers: ['esaude-emr-poc']
    },
    {
      id: 'admin',
      name: 'eSaude Admin',
      containers: ['esaude-admin-api', 'esaude-admin-web']
    }
  ],

  dockerSocketPath: '/var/run/docker.sock'
}
