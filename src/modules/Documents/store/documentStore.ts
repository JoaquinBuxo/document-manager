import { Document } from '../../../context/Documents/domain/Document';

type Subscriber = () => void;

export const documentStore = (() => {
  let updatedDocuments: Document[] = [];
  let viewDocuments: 'list' | 'grid' = 'list';
  let subscribers: Subscriber[] = [];

  const notifySubscribers = () => {
    subscribers.forEach((callback: Subscriber) => callback());
  };

  const subscribe = (callback: Subscriber) => {
    subscribers.push(callback);
  };

  const setDocuments = (documents: Document[]) => {
    updatedDocuments = documents;
    notifySubscribers();
  };

  const getDocuments = (): Document[] => {
    return updatedDocuments;
  };

  const sortDocuments = (sortBy: keyof Document) => {
    updatedDocuments.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
    notifySubscribers();
  };

  const createDocument = (doc: Document) => {
    updatedDocuments.push(doc);
    notifySubscribers();
  };

  const setViewDocuments = (view: 'list' | 'grid') => {
    viewDocuments = view;
    notifySubscribers();
  };

  const getViewDocuments = () => {
    return viewDocuments;
  };

  return {
    subscribe,
    setDocuments,
    getDocuments,
    sortDocuments,
    createDocument,
    setViewDocuments,
    getViewDocuments,
  };
})();
