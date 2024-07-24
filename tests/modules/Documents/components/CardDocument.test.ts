import { CardDocument } from '../../../../src/modules/Documents/components/CardDocument/CardDocument';
import {
  Document,
  User,
} from '../../../../src/context/Documents/domain/Document';

const mockDocument: Document = {
  ID: '1',
  Title: 'Test Document',
  Version: 'v1',
  Contributors: [
    { ID: '1', Name: 'Contributor 1' },
    { ID: '2', Name: 'Contributor 2' },
  ],
  Attachments: ['Attachment 1', 'Attachment 2'],
  CreatedAt: new Date().toISOString(),
  UpdatedAt: new Date().toISOString(),
};

describe('CardDocument', () => {
  it('should render the document title and version', () => {
    const card = CardDocument(mockDocument);
    document.body.appendChild(card);

    const titleElement = card.querySelector('h4');
    const versionElement = card.querySelector('p');

    expect(titleElement).not.toBeNull();
    expect(titleElement!.textContent).toBe(mockDocument.Title);

    expect(versionElement).not.toBeNull();
    expect(versionElement!.textContent).toBe(`Version ${mockDocument.Version}`);
  });

  it('should render the list of contributors', () => {
    const card = CardDocument(mockDocument);
    document.body.appendChild(card);

    const contributorsList = card.querySelector('ul:nth-of-type(1)');
    expect(contributorsList).not.toBeNull();
    expect(contributorsList!.children.length).toBe(
      mockDocument.Contributors.length,
    );

    mockDocument.Contributors.forEach((contributor, index) => {
      const listItem = contributorsList!.children[index];
      expect(listItem).not.toBeNull();
      expect(listItem.textContent).toBe(contributor.Name);
    });
  });

  it('should render the list of attachments', () => {
    const card = CardDocument(mockDocument);
    document.body.appendChild(card);

    const attachmentsList = card.querySelector('ul:nth-of-type(2)');
    expect(attachmentsList).not.toBeNull();
    expect(attachmentsList!.children.length).toBe(
      mockDocument.Attachments.length,
    );

    mockDocument.Attachments.forEach((attachment, index) => {
      const listItem = attachmentsList!.children[index];
      expect(listItem).not.toBeNull();
      expect(listItem.textContent).toBe(attachment);
    });
  });
});
