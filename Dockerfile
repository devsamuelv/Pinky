FROM node:16
WORKDIR /pinky
RUN yarn install
COPY . /pinky
CMD yarn prod
EXPOSE 80