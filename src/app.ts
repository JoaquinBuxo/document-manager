import { Header } from './components/Header/Header';
import { ListDocument } from './components/ListDocument/ListDocument';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')!;

  if (app) {
    app.appendChild(Header());
    const listDocumentComponent = ListDocument();
    app.appendChild(listDocumentComponent);
  }
});
