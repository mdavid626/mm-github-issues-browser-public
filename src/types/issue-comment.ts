import { Author } from './author';
import { PageInfo } from './pagination';

export type IssueComment = {
  id: string;
  createdAt: string;
  body: string;
  author: Author;
};

export type IssueQueryComments = {
  nodes: IssueComment[];
  pageInfo: PageInfo;
  totalCount: number;
};
