<br/><br/><br/>
<img src="https://s3-eu-west-1.amazonaws.com/esaude/images/esaude-site-header.png" alt="OpenMRS"/>
<br/><br/><br/>

# eSaude Admin API

[![Build Status](https://travis-ci.org/esaude/esaude-admin-api.svg?branch=master)](https://travis-ci.org/esaude/esaude-admin-api)
[![codecov](https://codecov.io/gh/esaude/esaude-admin-api/branch/master/graph/badge.svg)](https://codecov.io/gh/esaude/esaude-admin-api)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6e84b5282d0544c495e50560dc53d6e8)](https://www.codacy.com/app/esaude/esaude-admin-api)
[![eSaude Docs](https://omrs-shields.psbrandt.io/custom/esaude/docs/blue?logo=esaude)](https://docs.esaude.org)
[![eSaude Slack](https://slack.esaude.org/badge.svg)](https://slack.esaude.org)

The eSaude admin API is an [Express](https://expressjs.com/) application that
is built using [`swagger-node`](https://github.com/swagger-api/swagger-node).

## Install

To install the eSaude admin app, first install the [prerequisites](https://paper.dropbox.com/doc/eSaude-App-Install-Guide-Uvk5mTlgG2m0nyOYy5Zyg#:uid=515415815748821&h2=Prerequisites) (Docker & Compose), then follow the [eSaude Admin install instructions](https://paper.dropbox.com/doc/eSaude-App-Install-Guide-Uvk5mTlgG2m0nyOYy5Zyg#:uid=853323144286988&h2=eSaude-Admin):

```
$ wget https://get.esaude.org/app/esaude-app-admin.yml
$ docker-compose -p esaude -f esaude-app-admin.yml up -d
```

:pushpin: You will need need `v1.2.30+` of the [eSaude Platform](https://paper.dropbox.com/doc/eSaude-App-Install-Guide-Uvk5mTlgG2m0nyOYy5Zyg#:uid=496479570672974&h2=eSaude-EMR-Platform) running to use the admin app.

## Development

First make sure you have a recent version of [Node.js](https://nodejs.org/en/)
installed (tested with `v7.5.0`). Then, install `swagger` globally:

```
npm install -g swagger
```

Install the project dependencies:

```
npm install
```

### Run

To launch the API using Swagger, run:

```
swagger project start
```

When launched this way, the API is not running inside Docker, so we don't have
access to the platform containers. It's more useful to run a container that runs
the code in your working directory:

```
docker-compose -p esaude -f docker-compose-api-dev.yml up
```

To launch the Swagger editor, in a separate terminal, run:

```
swagger project edit
```

### Contribute

Read the [Express](https://expressjs.com/) and
[`swagger-node`](https://github.com/swagger-api/swagger-node/tree/master/docs)
documentation and make your edits to the Swagger spec and/or Express
controllers.

The API will watch the file system and automatically restart when changes
to the Swagger spec or Express controllers are made.

## Build

### Docker

To build a Docker image, first create a production build (see above), then run:

```
docker build -t esaude-admin-api:dev .
```

## Test

To test the API, run:

```
npm test
```

## License

[MPL 2.0 w/ HD](http://openmrs.org/license/)
