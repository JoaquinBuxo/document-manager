import DocumentStore from '../../store/DocumentStore';
import { Document } from '../../models/document';
import { CardDocument } from '../CardDocument/CardDocument';
import { NotificationBox } from '../NotificationBox/NotificationBox';

export const ListDocument = () => {
  const container = document.createElement('div');
  container.innerHTML = `
    <h2>Document List</h2>
    <button id="sort-by-title">Sort by Title</button>
    <button id="sort-by-createdAt">Sort by Created At</button>
    <ul id="list-documents"></ul>
    <button id="create-document">Create New Document</button>
  `;

  const renderDocuments = () => {
    const documents = DocumentStore.getDocuments();
    const listDocument = container.querySelector('#list-documents');

    if (listDocument) {
      listDocument.innerHTML = '';
      documents.forEach((doc: Document) => {
        const cardElement = CardDocument(doc);
        listDocument.appendChild(cardElement);
      });
    }
  };

  container.querySelector('#sort-by-title')!.addEventListener('click', () => {
    DocumentStore.sortDocuments('Title');
    renderDocuments();
  });

  container
    .querySelector('#sort-by-createdAt')!
    .addEventListener('click', () => {
      DocumentStore.sortDocuments('CreatedAt');
      renderDocuments();
    });

  container.querySelector('#create-document')!.addEventListener('click', () => {
    const newDocument = DocumentStore.generateRandomDocument();
    DocumentStore.createDocument(newDocument);
    renderDocuments();
  });

  const socket = new WebSocket('ws://localhost:8080/notifications');

  socket.addEventListener('message', (event) => {
    const notification = JSON.parse(event.data);
    DocumentStore.createDocumentNotification(notification);
    renderDocuments();

    const notificationBox = NotificationBox('New document added');
    document.body.appendChild(notificationBox);
  });

  DocumentStore.fetchDocuments().then(renderDocuments);

  return container;
};
