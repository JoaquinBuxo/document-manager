import { Notification } from '../../../../src/context/Notifications/domain/Notification';
import { NotificationRepository } from '../../../../src/context/Notifications/domain/NotificationRepository';
import { getNotifications } from '../../../../src/context/Notifications/application/getNotifications';

const createMockNotificationRepository = () => {
  const subscribeNotifications = jest.fn();
  return { subscribeNotifications } as unknown as NotificationRepository;
};

describe('getNotifications', () => {
  let mockRepository: NotificationRepository;
  let mockCallback: jest.Mock;

  beforeEach(() => {
    mockRepository = createMockNotificationRepository();
    mockCallback = jest.fn();
  });

  it('should call subscribeNotifications with the provided callback', () => {
    getNotifications(mockRepository, mockCallback);

    expect(mockRepository.subscribeNotifications).toHaveBeenCalledWith(
      mockCallback,
    );
  });

  it('should call the callback when a notification is received', () => {
    const testNotification: Notification = {
      Timestamp: '123456789',
      UserId: 'user1',
      UserName: 'User One',
      DocumentID: 'doc1',
      DocumentTitle: 'Document Title',
    };

    const { subscribeNotifications } = mockRepository;
    (subscribeNotifications as jest.Mock).mockImplementation(
      (callback: any) => {
        callback(testNotification);
      },
    );

    getNotifications(mockRepository, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith(testNotification);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
