import { IssueComment, IssueComments } from '../types/issue-comment';
import { testAuthor1 } from './authors';

export const testIssueComment1: IssueComment = {
  id: 'IC_kwDOAJy2Ks5Ux_nZ',
  body: 'issue comment 1',
  createdAt: '2023-02-12T09:43:24.641Z',
  author: testAuthor1,
};

export const testIssueComment2: IssueComment = {
  id: 'IC_kwDOAJy2Ks5Ux4u7',
  body: 'issue comment 2',
  createdAt: '2022-01-11T10:42:25.655Z',
  author: testAuthor1,
};

export const testIssueComments1: IssueComments = {
  nodes: [testIssueComment1, testIssueComment2],
  pageInfo: {
    hasNextPage: true,
    endCursor: 'endCursor1',
  },
  totalCount: 2,
};

export const testEmptyIssueComments: IssueComments = {
  nodes: [],
  pageInfo: {
    hasNextPage: false,
    endCursor: 'endCursor1',
  },
  totalCount: 0,
};
