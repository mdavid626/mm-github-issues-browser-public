import { Author } from './author';

export type IssueComment = {
  id: string;
  createdAt: string;
  body: string;
  author: Author;
};
