import { generateRandomDocument } from '../../../../src/modules/Documents/utils/generateRandomDocument';

test('should generate a document with the expected properties', () => {
  const document = generateRandomDocument();

  expect(document).toHaveProperty('ID');
  expect(document).toHaveProperty('Title');
  expect(document).toHaveProperty('Version');
  expect(document).toHaveProperty('Contributors');
  expect(document).toHaveProperty('Attachments');
  expect(document).toHaveProperty('CreatedAt');
  expect(document).toHaveProperty('UpdatedAt');

  expect(typeof document.ID).toBe('string');
  expect(typeof document.Title).toBe('string');
  expect(typeof document.Version).toBe('string');
  expect(Array.isArray(document.Contributors)).toBe(true);
  expect(Array.isArray(document.Attachments)).toBe(true);
  expect(typeof document.CreatedAt).toBe('string');
  expect(typeof document.UpdatedAt).toBe('string');

  expect(document.Contributors.length).toBeGreaterThan(0);
  document.Contributors.forEach((contributor) => {
    expect(contributor).toHaveProperty('ID');
    expect(contributor).toHaveProperty('Name');
    expect(typeof contributor.ID).toBe('string');
    expect(typeof contributor.Name).toBe('string');
  });

  expect(document.Attachments.length).toBeGreaterThan(0);
  document.Attachments.forEach((attachment) => {
    expect(typeof attachment).toBe('string');
  });

  expect(new Date(document.CreatedAt).toString()).not.toBe('Invalid Date');
  expect(new Date(document.UpdatedAt).toString()).not.toBe('Invalid Date');
});
