FROM node:lts

# Install your app
WORKDIR /gluestack/shared/{INSTANCE_NAME}
COPY package*.json ./
RUN ["npm", "install"]
COPY . .
EXPOSE 9000

# Install npm dependencies
RUN ["npm", "install"]

# Run the app using Dapr
CMD ["sh", "-c", "npm run storybook -- -p 9000"]
