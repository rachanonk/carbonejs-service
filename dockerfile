# specify the node base image with your desired version node:<version>
FROM node:latest
COPY . /home/node/app
RUN wget http://downloadarchive.documentfoundation.org/libreoffice/old/7.1.5.2/deb/x86_64/LibreOffice_7.1.5.2_Linux_x86-64_deb.tar.gz -O libo.tar.gz
RUN apt update \
  && apt install -y libxinerama1 libfontconfig1 libdbus-glib-1-2 libcairo2 libcups2 libglu1-mesa libsm6 unzip \
  && tar -zxvf libo.tar.gz
WORKDIR LibreOffice_7.1.5.2_Linux_x86-64_deb/DEBS
RUN dpkg -i *.deb
RUN apt update
RUN npm install -g npm@7.20.3
RUN npm update
WORKDIR /home/node/app
# replace this with your application's default port
EXPOSE 3000
CMD [ "npm", "start" ]
