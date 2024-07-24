import { renderNotifications } from '../../../../src/modules/Notifications/utils/renderNotifications';
import { notificationStore } from '../../../../src/modules/Notifications/store/notificationStore';
import { NotificationBox } from '../../../../src/modules/Notifications/components/NotificationBox/NotificationBox';

jest.mock('../../../../src/modules/Notifications/utils/renderNotifications');
jest.mock(
  '../../../../src/modules/Notifications/store/notificationStore',
  () => ({
    notificationStore: {
      subscribe: jest.fn(),
    },
  }),
);

describe('NotificationBox', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a notification box with the correct id', () => {
    const message = 'Test Notification';
    const notificationBox = NotificationBox(message);

    expect(notificationBox).toBeInstanceOf(HTMLElement);
    expect(notificationBox.id).toBe('container-notification-box');
  });

  it('should call renderNotifications with the provided message', () => {
    const message = 'Test Notification';

    NotificationBox(message);

    expect(renderNotifications).toHaveBeenCalledWith(message);
  });

  it('should subscribe to the notificationStore with renderNotifications', () => {
    const message = 'Test Notification';

    NotificationBox(message);

    expect(notificationStore.subscribe).toHaveBeenCalledWith(
      expect.any(Function),
    );

    const callback = (notificationStore.subscribe as jest.Mock).mock
      .calls[0][0];
    callback();

    expect(renderNotifications).toHaveBeenCalledWith(message);
  });
});
