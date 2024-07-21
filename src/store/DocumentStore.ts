import { Document } from '../models/document';

const DocumentStore = (() => {
  let updatedDocuments: Document[] = [];

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

  const sortDocuments = (key: keyof Document) => {
    updatedDocuments.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  };

  return {
    getDocuments,
    fetchDocuments,
    sortDocuments,
  };
})();

export default DocumentStore;
