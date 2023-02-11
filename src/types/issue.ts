import { PageInfo } from './pagination';

export type IssueState = 'OPEN' | 'CLOSED';

export type IssuesQueryItem = {
  id: string;
  createdAt: string;
  title: string;
  state: IssueState;
  number: number;
  url: string;
  author: {
    login: string;
  };
};

export type IssuesQueryResult = {
  search: {
    issueCount: number;
    nodes: IssuesQueryItem[];
    pageInfo: PageInfo;
  };
};

export type IssueComment = {
  id: string;
  body: string;
  author: {
    login: string;
  };
  createdAt: string;
};

export type IssueQueryItem = {
  id: string;
  createdAt: string;
  title: string;
  state: IssueState;
  number: number;
  url: string;
  body: string;
  author: {
    login: string;
  };
  comments: {
    nodes: IssueComment[];
    pageInfo: PageInfo;
    totalCount: number;
  };
};

export type IssueQueryResult = {
  repository: {
    issue: IssueQueryItem;
  };
};
