import { getDocuments } from '../../../../src/context/Documents/application/getDocuments';
import { DocumentRepository } from '../../../../src/context/Documents/domain/DocumentRepository';

describe('getDocuments', () => {
  let mockRepository: jest.Mocked<DocumentRepository>;
  let mockDocuments: any[];

  beforeEach(() => {
    mockDocuments = [
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

    mockRepository = {
      fetchDocuments: jest.fn().mockResolvedValue(mockDocuments),
    } as jest.Mocked<DocumentRepository>;
  });

  it('should fetch documents from the repository', async () => {
    const documents = await getDocuments(mockRepository);

    expect(mockRepository.fetchDocuments).toHaveBeenCalled();

    expect(documents).toEqual(mockDocuments);
  });
});
