import { notificationStore } from '../../store/notificationStore';
import { renderNotifications } from '../../utils/renderNotifications';
import './NotificationBox.css';
export const NotificationBox = (message: string) => {
  const notificationBox = document.createElement('div');
  notificationBox.id = 'container-notification-box';
  renderNotifications(message);

  notificationStore.subscribe(() => renderNotifications(message));

  return notificationBox;
};
