FROM ubuntu:18.04
MAINTAINER Arnis Lielturks <arnis.lielturks@gmail.com>

# Install all the dependencies
RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y nodejs \
    && apt-get purge --auto-remove -y && apt-get clean

COPY node_modules /var/app/node_modules
COPY app.js /var/app/app.js

WORKDIR /var/app

ENTRYPOINT nodejs /var/app/app.js
