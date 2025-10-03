import { useWebApp } from '@twa-dev/sdk-react';
import './TelegramUser.css';

export function TelegramUser() {
  const webApp = useWebApp();

  if (!webApp.initDataUnsafe.user) {
    return (
      <div className="telegram-user-container">
        <p>No Telegram user data found. Open this app in Telegram.</p>
      </div>
    );
  }

  const { firstName, lastName, username } = webApp.initDataUnsafe.user;

  return (
    <div className="telegram-user-container">
      <h3>Telegram User</h3>
      <p>
        Welcome, {firstName} {lastName || ''} (@{username})
      </p>
    </div>
  );
}