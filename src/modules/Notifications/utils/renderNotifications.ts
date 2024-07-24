import { NotificationBox } from '../components/NotificationBox/NotificationBox';
import { notificationStore } from '../store/notificationStore';

export const renderNotifications = (message: string) => {
  const notifications = notificationStore.getNotifications();
  const containerNotificationBox = document.querySelector(
    '#container-notification-box',
  );

  if (containerNotificationBox) {
    const notificationElement = document.createElement('div');
    notificationElement.className = 'notification-box';
    notificationElement.innerHTML = `&#9751 <span class="notification-count">${notifications.length}</span> ${message}`;

    containerNotificationBox.appendChild(notificationElement);

    setTimeout(() => {
      notificationElement.remove();
    }, 1500);
  }
};
