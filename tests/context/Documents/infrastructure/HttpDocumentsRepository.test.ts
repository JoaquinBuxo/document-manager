import { HttpDocumentsRepository } from '../../../../src/context/Documents/infrastructure/HttpDocumentsRepository';
import { DocumentRepository } from '../../../../src/context/Documents/domain/DocumentRepository';

describe('HttpDocumentsRepository', () => {
  beforeEach(() => {
    (global as any).fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch documents successfully', async () => {
    const mockDocuments = [
      {
        ID: '1',
        Title: 'Document 1',
        Version: 'v1',
        Contributors: [],
        Attachments: [],
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString(),
      },
    ];

    (global as any).fetch.mockResolvedValue({
      ok: true,
      json: async () => mockDocuments,
    });

    const repository: DocumentRepository = HttpDocumentsRepository();
    const documents = await repository.fetchDocuments();

    expect(documents).toEqual(mockDocuments);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/documents');
  });

  it('should handle network errors', async () => {
    (global as any).fetch.mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    });

    const repository: DocumentRepository = HttpDocumentsRepository();
    const documents = await repository.fetchDocuments();

    expect(documents).toEqual([]);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/documents');
  });

  it('should handle JSON parse errors', async () => {
    (global as any).fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        throw new Error('JSON parse error');
      },
    });

    const repository: DocumentRepository = HttpDocumentsRepository();
    const documents = await repository.fetchDocuments();

    expect(documents).toEqual([]);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/documents');
  });
});
