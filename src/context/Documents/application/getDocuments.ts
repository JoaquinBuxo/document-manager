import { DocumentRepository } from '../domain/DocumentRepository';

export const getDocuments = (documentRepository: DocumentRepository) => {
  return documentRepository.fetchDocuments();
};
