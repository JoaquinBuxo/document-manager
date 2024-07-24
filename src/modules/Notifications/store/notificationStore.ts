import { Notification } from '../../../context/Notifications/domain/Notification';

type Subscriber = () => void;

export const notificationStore = (() => {
  let updatedNotifications: Notification[] = [];
  let subscribers: Subscriber[] = [];

  const notifySubscribers = () => {
    subscribers.forEach((callback: Subscriber) => callback());
  };

  const subscribe = (callback: Subscriber) => {
    subscribers.push(callback);
  };

  const setNotifications = (notification: Notification) => {
    updatedNotifications.push(notification);
    notifySubscribers();
  };

  const getNotifications = (): Notification[] => {
    return updatedNotifications;
  };

  return {
    subscribe,
    setNotifications,
    getNotifications,
  };
})();
