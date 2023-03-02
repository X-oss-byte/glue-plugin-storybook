FROM node:lts

# Install your app
WORKDIR /gluestack/shared/{INSTANCE_NAME}

COPY package*.json ./

RUN ["npm", "install"]
RUN ["npm", "install", "typescript"]

EXPOSE 9000

# Run the app using Dapr
# CMD ["sh", "-c", "npm run storybook -- -p 9000"]
CMD ["sh", "-c", "tail -f package.json"]
