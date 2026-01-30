FROM cypress/included:cypress-15.8.2-node-24.13.0-chrome-143.0.7499.192-1-ff-147.0-edge-143.0.3650.139-1
WORKDIR /app

COPY . .

RUN npm install

CMD ["npx", "cypress", "run", "--config-file", "qauto.config.js", "--browser", "firefox"]
