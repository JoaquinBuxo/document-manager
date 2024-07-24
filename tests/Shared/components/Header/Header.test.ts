import { documentStore } from '../../../../src/modules/Documents/store/documentStore';
import { Header } from '../../../../src/modules/Shared/components/Header/Header';
import { Document } from '../../../../src/context/Documents/domain/Document';
import { waitFor } from '@testing-library/dom';

jest.mock('../../../../src/modules/Documents/store/documentStore', () => ({
  documentStore: {
    sortDocuments: jest.fn(),
    setViewDocuments: jest.fn(),
  },
}));

describe('Header Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render the header with sort and view options', async () => {
    const header = Header();
    document.body.appendChild(header);

    await waitFor(() => {
      expect(document.querySelector('h1')?.textContent).toBe('Documents');
      expect(document.querySelector('#sort-options')).not.toBeNull();
      expect(document.querySelector('#view-list')).not.toBeNull();
      expect(document.querySelector('#view-grid')).not.toBeNull();
    });
  });

  it('should call documentStore.sortDocuments when sort option changes', async () => {
    const header = Header();
    document.body.appendChild(header);

    const sortOptions = document.querySelector(
      '#sort-options',
    ) as HTMLSelectElement;
    sortOptions.value = 'Title';
    sortOptions.dispatchEvent(new Event('change'));

    await waitFor(() => {
      expect(documentStore.sortDocuments).toHaveBeenCalledWith('Title');
    });
  });

  it('should call documentStore.setViewDocuments with "list" when view-list button is clicked', async () => {
    const header = Header();
    document.body.appendChild(header);

    const viewListButton = document.querySelector(
      '#view-list',
    ) as HTMLButtonElement;
    viewListButton.click();

    await waitFor(() => {
      expect(documentStore.setViewDocuments).toHaveBeenCalledWith('list');
    });
  });

  it('should call documentStore.setViewDocuments with "grid" when view-grid button is clicked', async () => {
    const header = Header();
    document.body.appendChild(header);

    const viewGridButton = document.querySelector(
      '#view-grid',
    ) as HTMLButtonElement;
    viewGridButton.click();

    await waitFor(() => {
      expect(documentStore.setViewDocuments).toHaveBeenCalledWith('grid');
    });
  });
});
