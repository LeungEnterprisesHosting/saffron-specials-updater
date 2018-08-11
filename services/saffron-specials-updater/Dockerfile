# Lambda execution AMI
FROM amazonlinux:2017.03.1.20170812-with-sources

SHELL ["/bin/bash", "-c"]

# build-essential for Fedora
RUN yum install -y make automake gcc gcc-c++ kernel-devel

# Node.js
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | \
    bash -
RUN yum install -y nodejs
RUN npm install -g serverless

COPY . /tmp

WORKDIR /tmp

ARG CACHE_BUSTER
RUN npm install

# Keep container open long enough to copy
CMD sleep infinity