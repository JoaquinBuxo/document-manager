import { ListDocument } from './components/ListDocument/ListDocument';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')!;

  const documentList = ListDocument();

  app.appendChild(documentList);
});
