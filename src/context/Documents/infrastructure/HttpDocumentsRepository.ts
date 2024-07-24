import { DocumentRepository } from '../domain/DocumentRepository';

const baseUrl = 'http://localhost:8080';
const fetchDocuments = async () => {
  try {
    const response = await fetch(`${baseUrl}/documents`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const documents = await response.json();
    return documents;
  } catch (error) {
    console.error('Error fetch documents:', error);
    return [];
  }
};

export const HttpDocumentsRepository = (): DocumentRepository => {
  return { fetchDocuments };
};
