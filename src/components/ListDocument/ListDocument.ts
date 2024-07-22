import DocumentStore from '../../store/DocumentStore';
import { NotificationBox } from '../NotificationBox/NotificationBox';
import './ListDocument.css';
import { renderDocuments } from '../../utils/RenderDocuments';

export const ListDocument = () => {
  const container = document.createElement('div');
  container.innerHTML = `
    <div id="loading" style="display: none;">Loading...</div>
    <div id="list-documents"></div>
    <button id="add-document">+ Add document</button>
  `;

  container.querySelector('#add-document')!.addEventListener('click', () => {
    const newDocument = DocumentStore.generateRandomDocument();
    DocumentStore.createDocument(newDocument);
    renderDocuments(DocumentStore.getViewDocuments());
    const listDocumentsElement = container.querySelector('#list-documents')!;
    container.style;
    listDocumentsElement.scrollTop = listDocumentsElement.scrollHeight;
  });

  const socket = new WebSocket('ws://localhost:8080/notifications');

  socket.addEventListener('message', (event) => {
    const notification = JSON.parse(event.data);
    DocumentStore.createDocumentNotification(notification);
    renderDocuments(DocumentStore.getViewDocuments());

    const notificationBox = NotificationBox('New document added');
    document.body.appendChild(notificationBox);
  });

  const loadingElement = container.querySelector('#loading')! as HTMLDivElement;
  loadingElement.style.display = 'block';

  DocumentStore.fetchDocuments()
    .then(() => {
      renderDocuments(DocumentStore.getViewDocuments());
      loadingElement.style.display = 'none';
    })
    .catch((error) => {
      console.error('Error loading documents:', error);
    });

  return container;
};
