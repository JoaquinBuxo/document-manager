import { Document, Message } from '../models/document';

const DocumentStore = (() => {
  let updatedDocuments: Document[] = [];
  let viewDocuments: 'list' | 'grid' = 'list';

  const fetchDocuments = async (): Promise<Document[]> => {
    try {
      const response = await fetch('http://localhost:8080/documents');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      updatedDocuments = await response.json();
      return updatedDocuments;
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      return [];
    }
  };

  const getDocuments = (): Document[] => {
    return updatedDocuments;
  };

  const sortDocuments = (sortBy: keyof Document) => {
    updatedDocuments.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  };

  const generateRandomDocument = (): Document => {
    const randomTitle = `Document ${Math.floor(Math.random() * 1000)}`;
    const randomVersion = `v${Math.floor(Math.random() * 10)}`;
    const randomContributors = [
      {
        ID: `${Math.floor(Math.random() * 100)}`,
        Name: `Contributor ${Math.floor(Math.random() * 100)}`,
      },
    ];
    const randomAttachments = [`Attachment ${Math.floor(Math.random() * 100)}`];

    return {
      ID: `${Math.floor(Math.random() * 1000)}`,
      Title: randomTitle,
      Version: randomVersion,
      Contributors: randomContributors,
      Attachments: randomAttachments,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
    };
  };

  const createDocument = (doc: Document) => {
    updatedDocuments.push(doc);
  };

  const createDocumentNotification = (notification: Message) => {
    const newDocument: Document = {
      ID: notification.DocumentID,
      Title: notification.DocumentTitle,
      Contributors: [
        {
          ID: notification.UserId,
          Name: notification.UserName,
        },
      ],
      Version: '1.0',
      Attachments: [],
      CreatedAt: notification.Timestamp,
      UpdatedAt: notification.Timestamp,
    };

    updatedDocuments.push(newDocument);
  };

  const setViewDocuments = (view: 'list' | 'grid') => {
    viewDocuments = view;
  };

  const getViewDocuments = () => {
    return viewDocuments;
  };

  return {
    getDocuments,
    fetchDocuments,
    sortDocuments,
    generateRandomDocument,
    createDocument,
    createDocumentNotification,
    setViewDocuments,
    getViewDocuments,
  };
})();

export default DocumentStore;
