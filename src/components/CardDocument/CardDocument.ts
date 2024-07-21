import { Document, User } from '@/src/models/document';
import './CardDocument.css';

export function CardDocument(doc: Document): HTMLElement {
  const card = document.createElement('div');
  const containerName = document.createElement('div');
  const title = document.createElement('h4');
  const version = document.createElement('div');
  const contributors = document.createElement('ul');
  const attachments = document.createElement('ul');

  title.textContent = doc.Title;
  version.textContent = `Version ${doc.Version}`;

  doc.Contributors.forEach((contributor: User) => {
    const li = document.createElement('li');
    li.textContent = contributor.Name;
    contributors.appendChild(li);
  });

  doc.Attachments.forEach((attachment: string) => {
    const li = document.createElement('li');
    li.textContent = attachment;
    attachments.appendChild(li);
  });

  card.appendChild(containerName);
  containerName.appendChild(title);
  containerName.appendChild(version);
  card.appendChild(contributors);
  card.appendChild(attachments);

  card.className = 'document-card';

  return card;
}
