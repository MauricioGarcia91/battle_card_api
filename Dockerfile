# Start your image with a node base image
FROM node:20-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./
COPY tsconfig.json ./

# Copy local directories to the current local directory of our docker image (/app)
COPY ./config ./config
COPY ./scripts ./scripts
COPY ./src ./src
COPY ./swagger.json ./swagger.json

# Install node packages, build the app, and remove tsc code from src folder
RUN npm install \
    && npm run load-dev-env \
    && npm run build \
    && rm -fr src

EXPOSE 4000

# Start the app using npm command
CMD npm start