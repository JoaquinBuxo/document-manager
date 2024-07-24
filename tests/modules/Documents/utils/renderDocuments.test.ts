import { renderDocuments } from '../../../../src/modules/Documents/utils/renderDocuments';
import { documentStore } from '../../../../src/modules/Documents/store/documentStore';
import { Document } from '../../../../src/context/Documents/domain/Document';
import { waitFor } from '@testing-library/dom';

const mockDocuments: Document[] = [
  {
    ID: '1',
    Title: 'Document 1',
    Version: 'v1',
    Contributors: [{ ID: '1', Name: 'Contributor 1' }],
    Attachments: ['Attachment 1'],
    CreatedAt: new Date().toISOString(),
    UpdatedAt: new Date().toISOString(),
  },
  {
    ID: '2',
    Title: 'Document 2',
    Version: 'v2',
    Contributors: [{ ID: '2', Name: 'Contributor 2' }],
    Attachments: ['Attachment 2'],
    CreatedAt: new Date().toISOString(),
    UpdatedAt: new Date().toISOString(),
  },
];

jest.mock('../../../../src/modules/Documents/store/documentStore', () => ({
  documentStore: {
    getDocuments: jest.fn(),
  },
}));

jest.mock(
  '../../../../src/modules/Documents/components/CardDocument/CardDocument',
  () => ({
    CardDocument: jest.fn().mockImplementation((doc) => {
      const div = document.createElement('div');
      div.textContent = doc.Title;
      return div;
    }),
  }),
);

describe('renderDocuments', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="list-documents"></div>';
    (documentStore.getDocuments as jest.Mock).mockReturnValue(mockDocuments);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render documents in list view', async () => {
    renderDocuments('list');

    await waitFor(() => {
      const listDocument = document.querySelector('#list-documents');
      if (listDocument) {
        expect(listDocument.classList.contains('view-list')).toBe(true);
        expect(listDocument.children.length).toBe(mockDocuments.length);

        mockDocuments.forEach((doc) => {
          expect(listDocument.textContent).toContain(doc.Title);
        });
      }
    });
  });

  it('should render documents in grid view', async () => {
    renderDocuments('grid');

    await waitFor(() => {
      const listDocument = document.querySelector('#list-documents');
      if (listDocument) {
        expect(listDocument.classList.contains('view-grid')).toBe(true);
        expect(listDocument.children.length).toBe(mockDocuments.length);

        mockDocuments.forEach((doc) => {
          expect(listDocument.textContent).toContain(doc.Title);
        });
      }
    });
  });
});
