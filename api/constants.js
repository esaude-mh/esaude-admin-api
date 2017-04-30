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

  dockerSocketPath: '/var/run/docker.sock'
}
