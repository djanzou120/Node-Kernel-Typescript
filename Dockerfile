FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

COPY tsconfig.json ./

COPY src ./src

COPY prisma ./prisma

COPY routes ./routes

COPY public ./public

COPY bin ./bin

COPY assets ./assets

COPY app ./app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN npm install typescript ts-node prisma nodemon -g

RUN prisma generate

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]