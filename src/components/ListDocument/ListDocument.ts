import DocumentStore from '../../store/DocumentStore';
import { Document } from '../../models/document';
import { CardDocument } from '../CardDocument/CardDocument';
import { NotificationBox } from '../NotificationBox/NotificationBox';
import './ListDocument.css';

export const ListDocument = () => {
  let view: 'list' | 'grid' = 'list';
  const container = document.createElement('div');
  container.innerHTML = `
      <header>
        <h1>Documents</h1>
        <div class="header-select">
          <div>
            Sort by: 
            <select id="sort-options">
              <option value="">Select one...</option>
              <option value="Title">Name</option>
              <option value="Version">Version</option>
              <option value="CreatedAt">Created At</option>
            </select>
          </div>
          <div class="header-view">
            <button id="view-list" class="view-button">&#9776</button>
            <button id="view-grid" class="view-button">&#9783</button>
          </div>
        </div>
      </header>
    <div id="list-documents"></div>
    <button id="add-document">+ Add document</button>
  `;

  const renderDocuments = () => {
    const documents = DocumentStore.getDocuments();
    const listDocument = container.querySelector('#list-documents');

    if (listDocument) {
      listDocument.innerHTML = '';
      listDocument.className = view === 'list' ? 'view-list' : 'view-grid';
      documents.forEach((doc: Document) => {
        const cardElement = CardDocument(doc);
        listDocument.appendChild(cardElement);
      });
    }
  };

  container
    .querySelector('#sort-options')!
    .addEventListener('change', (event) => {
      const sortBy = (event.target as HTMLSelectElement)
        .value as keyof Document;
      DocumentStore.sortDocuments(sortBy);
      renderDocuments();
    });

  container.querySelector('#view-list')!.addEventListener('click', () => {
    view = 'list';
    renderDocuments();
  });

  container.querySelector('#view-grid')!.addEventListener('click', () => {
    view = 'grid';
    renderDocuments();
  });

  container.querySelector('#add-document')!.addEventListener('click', () => {
    const newDocument = DocumentStore.generateRandomDocument();
    DocumentStore.createDocument(newDocument);
    renderDocuments();
    const listDocumentsElement = container.querySelector('#list-documents')!;
    listDocumentsElement.scrollTop = listDocumentsElement.scrollHeight;
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
