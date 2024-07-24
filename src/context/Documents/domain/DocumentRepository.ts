import { Document } from './Document';

export type DocumentRepository = {
  fetchDocuments: () => Promise<Document[]>;
};
