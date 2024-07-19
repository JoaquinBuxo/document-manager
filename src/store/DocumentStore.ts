import { Document } from '../models/document';

const DocumentStore = (() => {
  async function fetchDocuments(): Promise<Document[]> {
    try {
      const response = await fetch('http://localhost:8080/documents');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const documents: Document[] = await response.json();
      return documents;
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      return [];
    }
  }

  return {
    fetchDocuments,
  };
})();

export default DocumentStore;
