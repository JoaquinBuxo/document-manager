import DocumentStore from './store/DocumentStore';
import { Document } from './models/document';
import { CardDocument } from './components/CardDocument/CardDocument';

async function fetchAndDisplayDocuments() {
  const documents = await DocumentStore.fetchDocuments();
  const container = document.getElementById('documents-container');

  documents.forEach((doc: Document) => {
    const cardElement = CardDocument(doc);
    container?.appendChild(cardElement);
  });
}

fetchAndDisplayDocuments();
