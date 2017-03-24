'use strict';

const fs = require('fs');

module.exports = {
  about: (req, res) => {
      const pkg = JSON.parse(fs.readFileSync('package.json'));

      res.json({
        description: pkg.description,
        version: pkg.version,
        homepage: pkg.homepage,
        license: pkg.license,
        bugs: pkg.bugs
      });
  }
};
