FROM node:22-alpine

RUN apk update && apk add --no-cache \
    build-base \
    openjdk17 \
    python3 \
    py3-pip \
    bash

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk
ENV PATH="${JAVA_HOME}/bin:${PATH}"

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5000
CMD ["node", "index.js"]
