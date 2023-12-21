FROM node:18
WORKDIR /usr/scr/app
COPY . .
RUN yarn install
CMD ["yarn", "start"]