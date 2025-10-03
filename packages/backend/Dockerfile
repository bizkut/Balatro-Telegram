# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source
COPY . .

# Build the TypeScript source
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the app
CMD [ "npm", "start" ]