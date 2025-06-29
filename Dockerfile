# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install --production

# Copy all files
COPY . .

# Generate Prisma client (make sure prisma is a dependency)
RUN npx prisma generate

ENV TZ="Asia/Kolkata"
RUN date

# Start the app
CMD ["npm", "start"]
