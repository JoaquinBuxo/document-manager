import { Document } from '../../../../context/Documents/domain/Document';
import { documentStore } from '../../../Documents/store/documentStore';
import './Header.css';

export const Header = () => {
  const header = document.createElement('header');
  header.innerHTML = `
    <header>
      <h1>Documents</h1>
      <div class="header-select">
        <div>
          Sort by: 
          <select id="sort-options" class="sort-select">
            <option value="">Select one...</option>
            <option value="Title">Name</option>
            <option value="Version">Version</option>
            <option value="CreatedAt">Created At</option>
          </select>
        </div>
        <div class="header-view">
          <button id="view-list" class="view-button">&#9776</button>
          <button id="view-grid" class="view-button">&#9783</button>
        </div>
      </div>
    </header>
  `;

  header.querySelector('#sort-options')!.addEventListener('change', (event) => {
    const sortBy = (event.target as HTMLSelectElement).value as keyof Document;
    documentStore.sortDocuments(sortBy);
  });

  header.querySelector('#view-list')!.addEventListener('click', () => {
    documentStore.setViewDocuments('list');
  });

  header.querySelector('#view-grid')!.addEventListener('click', () => {
    documentStore.setViewDocuments('grid');
  });

  return header;
};
