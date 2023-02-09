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
  repository: {
    issues: {
      edges: { node: IssuesQueryItem }[];
    };
  };
};

export type IssueQueryItem = {
  id: string;
  createdAt: string;
  title: string;
  state: IssueState;
  number: number;
  url: string;
  bodyText: string;
  author: {
    login: string;
  };
};

export type IssueQueryResult = {
  repository: {
    issue: IssueQueryItem;
  };
};
