FROM node:8.12.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
EXPOSE 7090
CMD ["node","./bin/www"]