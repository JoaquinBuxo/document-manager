import { getDocuments } from '../../../../src/context/Documents/application/getDocuments';
import { HttpDocumentsRepository } from '../../../../src/context/Documents/infrastructure/HttpDocumentsRepository';
import { documentStore } from '../../../../src/modules/Documents/store/documentStore';
import { serviceDocuments } from '../../../../src/modules/Documents/services/serviceDocuments';

jest.mock('../../../../src/context/Documents/application/getDocuments');
jest.mock(
  '../../../../src/context/Documents/infrastructure/HttpDocumentsRepository',
);
jest.mock('../../../../src/modules/Documents/store/documentStore');

describe('serviceDocuments', () => {
  let getAllDocuments: () => Promise<void>;

  beforeEach(() => {
    (HttpDocumentsRepository as jest.Mock).mockReturnValue({});
    const service = serviceDocuments();
    getAllDocuments = service.getAllDocuments;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch documents and update the store', async () => {
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

    (getDocuments as jest.Mock).mockResolvedValue(mockDocuments);
    const setDocumentsMock = jest.fn();
    (documentStore.setDocuments as jest.Mock).mockImplementation(
      setDocumentsMock,
    );

    await getAllDocuments();

    expect(getDocuments).toHaveBeenCalled();
    expect(setDocumentsMock).toHaveBeenCalledWith(mockDocuments);
  });

  it('should handle empty documents list', async () => {
    const mockDocuments: Document[] = [];

    (getDocuments as jest.Mock).mockResolvedValue(mockDocuments);
    const setDocumentsMock = jest.fn();
    (documentStore.setDocuments as jest.Mock).mockImplementation(
      setDocumentsMock,
    );

    await getAllDocuments();

    expect(getDocuments).toHaveBeenCalled();
    expect(setDocumentsMock).toHaveBeenCalledWith(mockDocuments);
  });

  it('should handle errors when fetching documents', async () => {
    const error = new Error('Network Error');
    (getDocuments as jest.Mock).mockRejectedValue(error);
    const setDocumentsMock = jest.fn();
    (documentStore.setDocuments as jest.Mock).mockImplementation(
      setDocumentsMock,
    );

    try {
      await getAllDocuments();
    } catch (e) {
      expect(e).toBe(error);
    }

    expect(getDocuments).toHaveBeenCalled();
    expect(setDocumentsMock).not.toHaveBeenCalled();
  });
});
