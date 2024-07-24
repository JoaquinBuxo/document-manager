export type User = {
  ID: string;
  Name: string;
};

export type Document = {
  ID: string;
  Title: string;
  Contributors: User[];
  Version: string;
  Attachments: string[];
  CreatedAt: string;
  UpdatedAt: string;
};
