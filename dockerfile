# Start from the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Prisma schema file and generate Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the application files
COPY . .

# Expose the application port (default for Express.js)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
