FROM node:5.9.0
MAINTAINER Andrew Dennison "andrew.dennison@live.com.au"

# Create app directory
RUN mkdir -p /usr/src/app

# Copy app source
COPY dist /usr/src/app

# Install app dependencies
WORKDIR /usr/src/app
RUN npm install

EXPOSE 9000
CMD [ "npm", "start" ]