FROM node


WORKDIR /app


COPY ./package.json .
COPY . .


RUN npm install 

EXPOSE 3006
CMD ["node", "index.js"]