FROM node:16-alpine3.12

# Maintainer
LABEL authors="devactivity"

# Define environment variable
ENV appDir /usr/src/app

COPY src/package*.json /tmp/
RUN cd /tmp && npm install --only=production
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/

COPY src/ ${appDir}

WORKDIR ${appDir}

EXPOSE 5000

CMD ["node", "app.js"]
