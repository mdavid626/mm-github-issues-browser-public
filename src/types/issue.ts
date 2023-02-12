import { Author } from './author';
import { IssueComments } from './issue-comment';
import { PageInfo } from './pagination';

export type IssueState = 'OPEN' | 'CLOSED';

export type Issue = {
  id: string;
  createdAt: string;
  title: string;
  state: IssueState;
  number: number;
  url: string;
  body: string;
  author: Author;
  comments: IssueComments;
};

export type IssueQueryResult = {
  repository: {
    issue: Issue;
  };
};

export type IssuesItem = Pick<
  Issue,
  'id' | 'createdAt' | 'title' | 'state' | 'number' | 'url' | 'author'
>;

export type IssuesQueryResult = {
  search: {
    issueCount: number;
    nodes: IssuesItem[];
    pageInfo: PageInfo;
  };
};
