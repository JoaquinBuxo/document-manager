import { ListDocument } from '../../../../src/modules/Documents/components/ListDocument/ListDocument';
import { documentStore } from '../../../../src/modules/Documents/store/documentStore';
import { serviceDocuments } from '../../../../src/modules/Documents/services/serviceDocuments';
import { generateRandomDocument } from '../../../../src/modules/Documents/utils/generateRandomDocument';
import { Document } from '../../../../src/context/Documents/domain/Document';
import { screen, fireEvent, waitFor } from '@testing-library/dom';

jest.mock(
  '../../../../src/modules/Documents/services/serviceDocuments',
  () => ({
    serviceDocuments: jest.fn(),
  }),
);

jest.mock('../../../../src/modules/Documents/store/documentStore', () => ({
  documentStore: {
    subscribe: jest.fn(),
    getViewDocuments: jest.fn(),
    getDocuments: jest.fn(),
    createDocument: jest.fn(),
  },
}));

jest.mock(
  '../../../../src/modules/Documents/utils/generateRandomDocument',
  () => ({
    generateRandomDocument: jest.fn(),
  }),
);

describe('ListDocument', () => {
  let mockDocuments: Document[];
  let getAllDocumentsMock: jest.Mock;

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

    getAllDocumentsMock = jest.fn().mockResolvedValue(mockDocuments);

    (serviceDocuments as jest.Mock).mockReturnValue({
      getAllDocuments: getAllDocumentsMock,
    });

    document.body.innerHTML = '';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component and load documents', async () => {
    const container = ListDocument();
    document.body.appendChild(container);

    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement.style.display).toBe('block');

    await waitFor(() => expect(getAllDocumentsMock).toHaveBeenCalled());

    expect(loadingElement.style.display).toBe('none');
    expect(documentStore.subscribe).toHaveBeenCalled();
  });

  it('should add a new document on button click', async () => {
    const newDocument = {
      ID: '2',
      Title: 'New Document',
      Version: 'v2',
      Contributors: [],
      Attachments: [],
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
    };

    (generateRandomDocument as jest.Mock).mockReturnValue(newDocument);

    const container = ListDocument();
    document.body.appendChild(container);

    const addButton = screen.getByText('+ Add document');
    fireEvent.click(addButton);

    expect(generateRandomDocument).toHaveBeenCalled();
    expect(documentStore.createDocument).toHaveBeenCalledWith(newDocument);
  });
});
