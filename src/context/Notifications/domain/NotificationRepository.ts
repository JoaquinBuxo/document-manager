import { Notification } from './Notification';

export type NotificationRepository = {
  subscribeNotifications: (
    callback: (notification: Notification) => void,
  ) => void;
};
