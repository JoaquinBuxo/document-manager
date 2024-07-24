import { Notification } from '../../../../src/context/Notifications/domain/Notification';
import { notificationStore } from '../../../../src/modules/Notifications/store/notificationStore';

describe('renderNotifications', () => {
  let mockCallback: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (notificationStore as any).updatedNotifications = [];
    (notificationStore as any).subscribers = [];
    mockCallback = jest.fn();
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
});
