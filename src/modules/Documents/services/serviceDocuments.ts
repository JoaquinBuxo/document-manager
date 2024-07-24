import { getDocuments } from '../../../context/Documents/application/getDocuments';
import { HttpDocumentsRepository } from '../../../context/Documents/infrastructure/HttpDocumentsRepository';
import { documentStore } from '../store/documentStore';

const repository = HttpDocumentsRepository();

export const serviceDocuments = () => {
  const getAllDocuments = async () => {
    const documents = await getDocuments(repository);
    documentStore.setDocuments(documents);
  };

  return {
    getAllDocuments,
  };
};
