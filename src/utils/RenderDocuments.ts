import { CardDocument } from '../components/CardDocument/CardDocument';
import { Document } from '../models/document';
import DocumentStore from '../store/DocumentStore';

export const renderDocuments = (view: 'list' | 'grid' = 'list') => {
  const documents = DocumentStore.getDocuments();
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
