FROM node:carbon

#MAINTAINER aleshkovskiy.av@nwenergo.com
#
WORKDIR /tmp
ADD package.json /tmp/package.json
#ADD wait-for-it.sh ./wait-for-it.sh
RUN npm install
RUN mkdir -p /usr/src/app
RUN cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

ADD . /usr/src/app

EXPOSE 3000:3000

#CMD ./wait-for-it.sh db:5432 && npm run start
CMD npm run start