FROM --platform=linux/amd64 node:lts-slim

RUN apt-get update -y && apt-get install -y openssl

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

COPY ./dist /usr/src/app/dist

# COPY .env
# COPY .env.docker.example .env

# Install app dependencies
RUN yarn install

EXPOSE 3344
EXPOSE 9229

CMD [ "yarn", "start" ]
