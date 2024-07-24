import { Document } from '../../../context/Documents/domain/Document';

export const generateRandomDocument = (): Document => {
  const randomTitle = `Document ${Math.floor(Math.random() * 1000)}`;
  const randomVersion = `v${Math.floor(Math.random() * 10)}`;
  const randomContributors = [
    {
      ID: `${Math.floor(Math.random() * 100)}`,
      Name: `Contributor ${Math.floor(Math.random() * 100)}`,
    },
  ];
  const randomAttachments = [`Attachment ${Math.floor(Math.random() * 100)}`];

  return {
    ID: `${Math.floor(Math.random() * 1000)}`,
    Title: randomTitle,
    Version: randomVersion,
    Contributors: randomContributors,
    Attachments: randomAttachments,
    CreatedAt: new Date().toISOString(),
    UpdatedAt: new Date().toISOString(),
  };
};
