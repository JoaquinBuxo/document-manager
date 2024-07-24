import { Document, User } from '../../../../context/Documents/domain/Document';
import './CardDocument.css';

export function CardDocument(doc: Document): HTMLElement {
  const card = document.createElement('div');
  card.className = 'document-card';

  let contributors = '';
  doc.Contributors.forEach((contributor: User) => {
    contributors += `<li>${contributor.Name}</li>`;
  });

  let attachments = '';
  doc.Attachments.forEach((attachment: string) => {
    attachments += `<li>${attachment}</li>`;
  });

  card.innerHTML = `
    <div>
      <h4>${doc.Title}</h4>
      <p>Version ${doc.Version}</p>
    </div>
    <ul>${contributors}</ul>
    <ul>${attachments}</ul>
  `;

  return card;
}
