require("dotenv").config();

const { App } = require("@slack/bolt");

const axios = require("axios");

console.log("Working directory:", process.cwd());

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/kage-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/kage-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/kage-ping - Check bot latency
/kage-time - Get the current time
/kage-joke - Get a random joke`
  });
});

app.command("/kage-time", async ({ ack, respond }) => {
  await ack();
  const now = new Date();
  await respond({ text: `The time is: ${now.toLocaleString()}` });
});

app.command("/kage-joke", async ({ ack, respond }) => {
  await ack();
  try {const response = await axios.get("https://icanhazdadjoke.com/", {
    headers: { "Accept": "application/json" }
  });
    await respond({
      text:`kage got the joke:${response.data.joke}`  
    });
  } catch (error) {
    console.error(error);
    await respond({ text: "the source played joke with kage" });
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();