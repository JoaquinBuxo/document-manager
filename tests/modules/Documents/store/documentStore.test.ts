import { Document } from '../../../../src/context/Documents/domain/Document';
import { documentStore } from '../../../../src/modules/Documents/store/documentStore';

describe('documentStore', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should subscribe and notify subscribers', () => {
    const mockCallback = jest.fn();
    documentStore.subscribe(mockCallback);

    const newDocument: Document = {
      ID: '1',
      Title: 'Test Document',
      Version: '1.0',
      Contributors: [],
      Attachments: [],
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
    };

    documentStore.createDocument(newDocument);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should set and get documents correctly', () => {
    const newDocuments: Document[] = [
      {
        ID: '1',
        Title: 'Test Document 1',
        Version: '1.0',
        Contributors: [],
        Attachments: [],
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString(),
      },
      {
        ID: '2',
        Title: 'Test Document 2',
        Version: '2.0',
        Contributors: [],
        Attachments: [],
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString(),
      },
    ];

    documentStore.setDocuments(newDocuments);

    expect(documentStore.getDocuments()).toEqual(newDocuments);
  });

  it('should sort documents correctly', () => {
    const newDocuments: Document[] = [
      {
        ID: '2',
        Title: 'B Document',
        Version: '1.0',
        Contributors: [],
        Attachments: [],
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString(),
      },
      {
        ID: '1',
        Title: 'A Document',
        Version: '2.0',
        Contributors: [],
        Attachments: [],
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString(),
      },
    ];

    documentStore.setDocuments(newDocuments);
    documentStore.sortDocuments('Title');

    expect(documentStore.getDocuments()[0].Title).toBe('A Document');
  });

  it('should set and get view as "grid"', () => {
    documentStore.setViewDocuments('grid');

    expect(documentStore.getViewDocuments()).toBe('grid');
  });
});
