# Balatro Clone - Telegram Bot

This package contains the Telegram bot that serves as the entry point for the Balatro Clone game.

## Configuration

To run the bot, you need to configure the following environment variables:

-   `BOT_TOKEN`: Your Telegram bot token, obtained from the BotFather.
-   `WEB_APP_URL`: The publicly accessible URL where your frontend application is deployed.

You can set these variables in a `.env` file at the root of this package, which will be loaded by a tool like `dotenv`, or you can set them directly in your deployment environment.

### `.env` example:

```
BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
WEB_APP_URL=https://your-frontend-domain.com
```

## Running the Bot

To start the bot, run the following command:

```bash
npm start
```

The bot will start polling for updates from the Telegram API. When a user sends the `/start` command, the bot will reply with a welcome message and a button to launch the web application.