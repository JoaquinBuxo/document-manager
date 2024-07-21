import './NotificationBox.css';
export const NotificationBox = (message: string) => {
  const notificationBox = document.createElement('div');
  notificationBox.className = 'notification-box';
  notificationBox.innerHTML = `&#9751 ${message}`;

  setTimeout(() => {
    notificationBox.remove();
  }, 1500);

  return notificationBox;
};
