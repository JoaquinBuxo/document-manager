import { CardDocument } from '../components/CardDocument/CardDocument';
import { Document } from '../../../context/Documents/domain/Document';
import { documentStore } from '../store/documentStore';

export const renderDocuments = (view: 'list' | 'grid' = 'list') => {
  const documents = documentStore.getDocuments();
  const listDocument = document.querySelector('#list-documents');

  if (listDocument) {
    listDocument.innerHTML = '';
    listDocument.className = view === 'list' ? 'view-list' : 'view-grid';
    documents.forEach((doc: Document) => {
      const cardElement = CardDocument(doc);
      listDocument.appendChild(cardElement);
    });
  }
};
