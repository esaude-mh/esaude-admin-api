<br/><br/><br/>
<img src="https://s3-eu-west-1.amazonaws.com/esaude/images/esaude-site-header.png" alt="OpenMRS"/>
<br/><br/><br/>

# eSaude Admin API

[![Build Status](https://img.shields.io/travis/esaude/esaude-admin/master.svg)](https://travis-ci.org/esaude/esaude-admin)
[![eSaude Slack](https://slack.esaude.org/badge.svg)](https://slack.esaude.org)

The eSaude admin API is an [Express](https://expressjs.com/) application that
is built using [`swagger-node`](https://github.com/swagger-api/swagger-node).

If you just want to install the eSaude admin app, see the [readme](../readme.me).

## Develop

### Prerequisites

First make sure you have a recent version of [Node.js](https://nodejs.org/en/)
installed (tested with `v7.5.0`). Then, install `swagger` globally:

```
npm install -g swagger
```

### Clone

Get the code:

```
git clone https://github.com/esaude/esaude-admin
```

Navigate to the API directory:

```
cd esaude-admin/api
```

Install dependencies:

```
npm install
```

### Run

To launch the API using Swagger, run:

```
swagger project start
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

## License

[MPL 2.0 w/ HD](http://openmrs.org/license/)
