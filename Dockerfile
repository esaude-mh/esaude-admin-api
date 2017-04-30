FROM node:7.7.4-alpine

ADD api /opt/esaude/api/api
ADD config /opt/esaude/api/config
ADD node_modules /opt/esaude/api/node_modules
ADD app.js /opt/esaude/api/app.js
ADD package.json /opt/esaude/api/package.json
ADD localtime /etc/localtime

VOLUME /opt/esaude/data

EXPOSE 2580

WORKDIR /opt/esaude/api/

# for use in dev environment
RUN npm install -g nodemon

CMD ["node", "app.js"]
