FROM node:18.20-alpine

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./yarn.lock .
RUN yarn

# Copy all files of our app (except files specified in the .gitignore)
COPY . .

# Build app
RUN yarn build

# Port
EXPOSE 3000

# Serve
CMD [ "yarn", "serve" ]