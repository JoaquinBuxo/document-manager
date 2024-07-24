import { Notification } from '../domain/Notification';
import { NotificationRepository } from '../domain/NotificationRepository';

const baseUrl = 'ws://localhost:8080';

export const HttpNotificationsRepository = (): NotificationRepository => {
  const socket = new WebSocket(`${baseUrl}/notifications`);

  const subscribeNotifications = (
    callback: (notification: Notification) => void,
  ) => {
    socket.addEventListener('message', (event) => {
      const notification = JSON.parse(event.data);
      callback(notification);
    });
  };

  return { subscribeNotifications };
};
