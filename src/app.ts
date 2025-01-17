import { Header } from './modules/Shared/components/Header/Header';
import { ListDocument } from './modules/Documents/components/ListDocument/ListDocument';
import { serviceNotifications } from './modules/Notifications/services/serviceNotifications';
import { NotificationBox } from './modules/Notifications/components/NotificationBox/NotificationBox';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const { listenNotifications } = serviceNotifications();

  listenNotifications();

  if (app) {
    app.appendChild(Header());
    app.appendChild(ListDocument());
    app.appendChild(NotificationBox('New Document Added'));
  }
});
