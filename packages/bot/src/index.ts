import TelegramBot from 'node-telegram-bot-api';

// It's crucial to use environment variables for sensitive data like bot tokens.
const token = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL || 'https://example.com'; // This should be the URL of your deployed frontend

if (!token) {
  console.error('BOT_TOKEN is not set in environment variables.');
  console.error('Please set it before running the bot.');
  process.exit(1);
}

// Initialize the bot
const bot = new TelegramBot(token, { polling: true });

// Handler for the /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const options = {
    reply_markup: {
      // Create an inline keyboard with a button that opens the web app
      inline_keyboard: [
        [
          {
            text: 'Play Balatro Clone',
            web_app: { url: webAppUrl },
          },
        ],
      ],
    },
  };

  const welcomeMessage = 'Welcome to the Balatro Clone! Click the button below to start playing.';

  // Send the welcome message with the inline keyboard
  bot.sendMessage(chatId, welcomeMessage, options);
});

console.log('Telegram bot started...');
console.log('Listening for /start command...');
console.log('Make sure to set BOT_TOKEN and WEB_APP_URL environment variables.');