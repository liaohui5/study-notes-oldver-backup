FROM node:lts-alpine

RUN npm install docsify-cli

WORKDIR /www/webapp

ADD . /www/webapp

EXPOSE 3000

CMD ["docsify", "serve", "."]
