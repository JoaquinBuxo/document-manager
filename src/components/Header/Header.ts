import { Document } from '../../models/document';
import DocumentStore from '../../store/DocumentStore';
import { renderDocuments } from '../../utils/RenderDocuments';
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
    DocumentStore.sortDocuments(sortBy);
    renderDocuments(DocumentStore.getViewDocuments());
  });

  header.querySelector('#view-list')!.addEventListener('click', () => {
    DocumentStore.setViewDocuments('list');
    renderDocuments(DocumentStore.getViewDocuments());
  });

  header.querySelector('#view-grid')!.addEventListener('click', () => {
    DocumentStore.setViewDocuments('grid');
    renderDocuments(DocumentStore.getViewDocuments());
  });

  return header;
};
