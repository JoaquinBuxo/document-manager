import { HttpNotificationsRepository } from '../../../context/Notifications/infrastructure/HttpNotificationsRepository';
import { getNotifications } from '../../../context/Notifications/application/getNotifications';
import { Notification } from '../../../context/Notifications/domain/Notification';
import { notificationStore } from '../store/notificationStore';

const repository = HttpNotificationsRepository();

export const serviceNotifications = () => {
  const handleNotification = (notification: Notification) => {
    notificationStore.setNotifications(notification);
    return notification;
  };

  const listenNotifications = () => {
    getNotifications(repository, handleNotification);
  };

  return {
    listenNotifications,
  };
};
