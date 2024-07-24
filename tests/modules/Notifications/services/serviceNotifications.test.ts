import { HttpNotificationsRepository } from '../../../../src/context/Notifications/infrastructure/HttpNotificationsRepository';
import { serviceNotifications } from '../../../../src/modules/Notifications/services/serviceNotifications';
import { notificationStore } from '../../../../src/modules/Notifications/store/notificationStore';
import { Notification } from '../../../../src/context/Notifications/domain/Notification';

jest.mock('../../../../src/context/Notifications/application/getNotifications');
jest.mock(
  '../../../../src/context/Notifications/infrastructure/HttpNotificationsRepository',
);
jest.mock(
  '../../../../src/modules/Notifications/store/notificationStore',
  () => ({
    notificationStore: {
      setNotifications: jest.fn(),
    },
  }),
);

describe('serviceNotifications', () => {
  let mockRepository: { subscribeNotifications: jest.Mock };
  let handleNotification: (notification: Notification) => void;

  beforeEach(() => {
    mockRepository = {
      subscribeNotifications: jest.fn(
        (callback: (notification: Notification) => void) => {
          handleNotification = callback;
        },
      ),
    };

    (HttpNotificationsRepository as jest.Mock).mockReturnValue(mockRepository);

    jest.clearAllMocks();
  });

  xit('should set up notification subscription', () => {
    const { listenNotifications } = serviceNotifications();

    listenNotifications();

    expect(mockRepository.subscribeNotifications).toHaveBeenCalledWith(
      expect.any(Function),
    );
  });

  xit('should handle and set notifications', () => {
    const testNotification: Notification = {
      Timestamp: '123456789',
      UserId: 'user1',
      UserName: 'User One',
      DocumentID: 'doc1',
      DocumentTitle: 'Document Title',
    };

    const { listenNotifications } = serviceNotifications();
    listenNotifications();

    if (handleNotification) {
      handleNotification(testNotification);
    }

    expect(notificationStore.setNotifications).toHaveBeenCalledWith(
      testNotification,
    );
  });
});
