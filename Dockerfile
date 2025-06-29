FROM node:20.15.0 as base


# Set working directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

# Copy all files
COPY . .

RUN npx prisma generate

RUN npx prisma db push

ENV TZ="Asia/Kolkata"
RUN date

# Start the app
CMD ["npm", "start"]
