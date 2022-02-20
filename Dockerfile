FROM node:16.13.0

RUN apt-get update && \
  apt-get install -y \
  neofetch \
  ffmpeg \
  wget \
  chromium && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .
RUN npm install -g npm@latest
RUN npm install 
RUN npm instal pm2 -g
RUN npm install ytdl-core
RUN npm install yt-search
COPY . .
EXPOSE 5000

CMD ["pm2-runtime", "index.js"]`
