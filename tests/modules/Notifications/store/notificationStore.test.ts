import { Notification } from '../../../../src/context/Notifications/domain/Notification';
import { notificationStore } from '../../../../src/modules/Notifications/store/notificationStore';

describe('notificationStore', () => {
  let mockCallback: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (notificationStore as any).updatedNotifications = [];
    (notificationStore as any).subscribers = [];
    mockCallback = jest.fn();
  });

  xit('should allow subscribers to be added', () => {
    notificationStore.subscribe(mockCallback);

    expect((notificationStore as any).subscribers.length).toBe(1);
    expect((notificationStore as any).subscribers[0]).toBe(mockCallback);
  });

  it('should notify subscribers when notifications are set', () => {
    notificationStore.subscribe(mockCallback);

    const testNotification: Notification = {
      Timestamp: '123456789',
      UserId: 'user1',
      UserName: 'User One',
      DocumentID: 'doc1',
      DocumentTitle: 'Document Title',
    };

    notificationStore.setNotifications(testNotification);

    expect(mockCallback).toHaveBeenCalled();

    expect(notificationStore.getNotifications()).toContain(testNotification);
  });

  xit('should retrieve notifications correctly', () => {
    const notifications: Notification[] = [
      {
        Timestamp: '123456789',
        UserId: 'user1',
        UserName: 'User One',
        DocumentID: 'doc1',
        DocumentTitle: 'Document Title',
      },
      {
        Timestamp: '987654321',
        UserId: 'user2',
        UserName: 'User Two',
        DocumentID: 'doc2',
        DocumentTitle: 'Another Document Title',
      },
    ];

    notifications.forEach((notification) =>
      notificationStore.setNotifications(notification),
    );

    expect(notificationStore.getNotifications()).toEqual(notifications);
  });
});
