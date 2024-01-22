# Use the official Node.js 14 image as a parent image
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

ENV PORT 3000

# Expose port 3000
EXPOSE 3000

# Run the app
CMD [ "node", "server.js" ]

