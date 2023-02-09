export type IssuesQueryItem = {
  id: string;
  createdAt: string;
  title: string;
  state: 'OPEN' | 'CLOSED';
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
