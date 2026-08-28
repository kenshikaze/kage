# 🥷 Kage — Slack Chatbot

Kage is a multifunctional Slack chatbot built with **Node.js** and **Slack Bolt**.
It provides useful utilities, fun commands, and API-powered features directly inside Slack.

## ✨ Features

* 🟢 **Ping** — Check whether Kage is online.
* 🕒 **Time** — Get the current time.
* 😂 **Dad Joke** — Get a random dad joke using an external API.
* 🌦️ **Weather** — Get current weather information for a city.
* 🔌 **Slack Socket Mode** — Kage can operate without requiring a public webhook server.

## 🛠️ Tech Stack

* **Node.js**
* **JavaScript**
* **Slack Bolt**
* **Axios**
* **dotenv**
* **Open-Meteo API**
* **icanhazdadjoke API**
* **Nest** — deployment

## 📋 Commands

| Command         | Description             | Example               |
| --------------- | ----------------------- | --------------------- |
| `/kage-ping`    | Check if Kage is online | `/kage-ping`          |
| `/kage-time`    | Get the current time    | `/kage-time`          |
| `/kage-joke`    | Get a random dad joke   | `/kage-joke`          |
| `/kage-weather` | Get weather for a city  | `/kage-weather Delhi` |

## 🚀 Running Kage Locally

### 1. Clone the repository

```bash
git clone https://github.com/kenshikaze/kage.git
cd kage
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your environment file

Create a file named:

```text
.env
```

Add your Slack tokens:

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
```

**Never commit your `.env` file to GitHub.**

### 4. Start Kage

```bash
node index.js
```

If everything is configured correctly, Kage will connect to Slack using Socket Mode.

## 🔐 Environment Variables

| Variable          | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `SLACK_BOT_TOKEN` | Authenticates Kage as a Slack bot        |
| `SLACK_APP_TOKEN` | Allows Kage to connect using Socket Mode |

## 🌦️ Weather

Kage uses **Open-Meteo** to retrieve weather information.

The weather command accepts a city:

```text
/kage-weather Delhi
```

Kage first finds the city's coordinates and then retrieves the current weather.

## 😂 Dad Jokes

Kage uses the **icanhazdadjoke API** to retrieve random dad jokes.

Example:

```text
/kage-joke
```

## 📁 Project Structure

```text
kage/
├── index.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── node_modules/
```

> `node_modules` and `.env` should not be committed to the repository.

## 🔒 Security

Do **not** put Slack tokens or API credentials directly into the source code.

Use environment variables instead:

```javascript
process.env.SLACK_BOT_TOKEN
process.env.SLACK_APP_TOKEN
```

Make sure `.gitignore` contains:

```gitignore
.env
node_modules/
```

## 🎯 Project Goal

Kage was created as a learning project to explore:

* Slack bot development
* APIs and HTTP requests
* Node.js
* JavaScript asynchronous programming
* Environment variables
* Git and GitHub
* Deployment
* Building useful tools for Slack

## 📌 Project Status

**Active development 🚧**

More commands and features may be added to Kage in the future.

---

### 👤 Author

**Kenshikaze**

Built with 🧠 curiosity, JavaScript, and a little bit of shadow magic. 🥷
