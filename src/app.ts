import { ListDocument } from './components/ListDocument/ListDocument';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')!;

  const documentList = ListDocument();

  app.appendChild(documentList);
});
