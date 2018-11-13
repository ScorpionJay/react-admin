FROM node:alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

RUN npm config set registry https://registry.npm.taobao.org -g
RUN npm install cnpm -g
RUN cd /app
RUN cnpm install

# Make port 80 available to the world outside this container
EXPOSE 9991

# Define environment variable
# ENV NAME World

# Run npm run dev when the container launches
# CMD ["npm","run","dev"]
CMD npm run dev