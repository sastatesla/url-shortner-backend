# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

# Copy all files
COPY . .

RUN npx prisma generate

RUN npx prisma db push

ENV TZ="Asia/Kolkata"
RUN date

# Start the app
CMD ["npm", "start"]
