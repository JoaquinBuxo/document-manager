import { documentStore } from '../../store/documentStore';
import { renderDocuments } from '../../utils/renderDocuments';
import { serviceDocuments } from '../../services/serviceDocuments';
import { generateRandomDocument } from '../../utils/generateRandomDocument';
import './ListDocument.css';

export const ListDocument = () => {
  const { getAllDocuments } = serviceDocuments();
  const container = document.createElement('div');
  container.innerHTML = `
    <div id="loading" style="display: none;">Loading...</div>
    <div id="list-documents"></div>
    <button id="add-document">+ Add document</button>
  `;

  documentStore.subscribe(() =>
    renderDocuments(documentStore.getViewDocuments()),
  );

  const addDocument = container.querySelector('#add-document');

  if (addDocument) {
    addDocument.addEventListener('click', () => {
      const newDocument = generateRandomDocument();
      documentStore.createDocument(newDocument);
      const listDocumentsElement = container.querySelector('#list-documents')!;
      container.style;
      listDocumentsElement.scrollTop = listDocumentsElement.scrollHeight;
    });
  }

  const loadingElement = container.querySelector('#loading') as HTMLDivElement;

  if (loadingElement) {
    loadingElement.style.display = 'block';

    getAllDocuments().finally(() => {
      loadingElement.style.display = 'none';
    });
  }

  return container;
};
