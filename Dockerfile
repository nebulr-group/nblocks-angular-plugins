# syntax=docker/dockerfile:1

# Supports ARM + x86-64
# 'as base' allows us to refer to this build stage in other build stages
FROM node:14-buster as base



# Set the root working dir inside container
# This way you do not have to type out full paths, you can use relative paths based on the working dir
WORKDIR "/app"
# Set layer caching for faster builds
# Runs only on package.json and package-lock.js change else uses cached Docker layers
COPY ["package.json", "package-lock.json", "./"]
RUN mkdir -p projects/nblocks-ionic
COPY ["./projects/nblocks-ionic/package.json", "./projects/nblocks-ionic/package-lock.json", "./projects/nblocks-ionic/"]

# Refering to base, and adding new build stage label 'test'
FROM base as test
RUN npm install -g @ionic/cli @angular/cli@12
# Installing prod and dev dependencies
RUN npm install; cd "./projects/nblocks-ionic"; npm install
# Copy rest of the projects source code to container env
COPY . .
# Run build with installed dep
RUN npm run build

# Refering to base, and adding new build stage label 'dev'
FROM base as dev
RUN npm install -g @ionic/cli @angular/cli@12
# Installing prod and dev dependencies
RUN npm install; cd "./projects/nblocks-ionic"; npm install
# Copy rest of the projects source code to container env
COPY . .
# Run build with installed dep
RUN npm run build


# Refering to base, and adding new build stage label 'prod'
FROM base as prod
RUN npm install -g @ionic/cli @angular/cli@12
# Installing prod dependencies
RUN npm install --production; cd "./project/nblocks-ionic"; npm install
# Copy rest of the projects source code to container env
COPY . .
# Run build with installed dep
RUN npm run build