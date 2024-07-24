import { Notification } from '../domain/Notification';
import { NotificationRepository } from '../domain/NotificationRepository';

export const getNotifications = (
  notificationRepository: NotificationRepository,
  callback: (notification: Notification) => void,
) => {
  return notificationRepository.subscribeNotifications(callback);
};
