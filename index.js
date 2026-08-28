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

app.command("/kage-weather", async ({ ack, respond, command }) => {
  await ack();
  const city = command.text.trim();
  if (!city) {
    await respond({
      text:"give me a city name ,bud like: ~kage-weather New York`"
    });
    return;
  }

  try {
    // Find the city's coordinate
    const locationResponse = await axios.get(
      "https://geocoding-api.open_meteo.com/v1/search",
      {
        params: {
          name: city,
          count:1,
          language: "en",
          format: "json"
        }
      }
    );
    const location = locationResponse.data.results[0];

    if (!location) {
      await respond({
        text: `i could not find "${city}". take another try,bud`
      });
      return;
    }

    // Get weather using the coordinates
    const weatherResponse = await axios.get(
      "https://api.open-meteo.com/v1/forecast",
      {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
          current: "temperature_2m,relative_humidity_2m,wind_speed_10m",
          timezone: "auto"
        }
      }
    );

    const weather = weatherResponse.data.current;

    await respond({
      text:
        `🌦️ *Kage Weather Report*\n\n` +
        `📍 ${location.name}, ${location.country}\n` +
        `🌡️ Temperature: ${weather.temperature_2m}°C\n` +
        `💧 Humidity: ${weather.relative_humidity_2m}%\n` +
        `💨 Wind: ${weather.wind_speed_10m} km/h`
    });

  } catch (error) {
    console.error("Weather API error:", error);

    await respond({
      text: "⚠️ Kage couldn't retrieve the weather right now."
    });
  }
});


(async () => {
  await app.start();
  console.log("bot is running!");
})();