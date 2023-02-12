import {
  Issue,
  IssueQueryResult,
  IssuesItem,
  IssuesQueryResult,
} from '../types/issue';
import { testAuthor1 } from './authors';
import { testEmptyIssueComments, testIssueComments1 } from './issue-comments';

export const testIssue1: Issue = {
  id: 'I_kwDOAJy2Ks5d65oG',
  createdAt: '2023-02-08T08:50:14Z',
  title: 'Bug: Failed when set homepage in package.json or set PUBLIC_URL',
  state: 'CLOSED',
  number: 26126,
  url: 'https://github.com/facebook/react/issues/26126',
  body: 'test issue1 body',
  author: testAuthor1,
  comments: testIssueComments1,
};

export const testIssue2: Issue = {
  id: 'I_abDOCJy2Ks4d65ED',
  createdAt: '2022-12-08T07:55:14Z',
  title: 'Considering use mobx?',
  state: 'OPEN',
  number: 26130,
  url: 'https://github.com/facebook/react/issues/26130',
  body: 'test issue2 body',
  author: testAuthor1,
  comments: testEmptyIssueComments,
};

export const testIssuesItem1: IssuesItem = {
  id: 'I_kwDOAJy2Ks5d65oG',
  createdAt: '2023-02-08T08:50:14Z',
  title: 'Bug: Failed when set homepage in package.json or set PUBLIC_URL',
  state: 'CLOSED',
  number: 26126,
  url: 'https://github.com/facebook/react/issues/26126',
  author: testAuthor1,
};

export const testIssueQueryResult1: IssueQueryResult = {
  repository: {
    issue: testIssue1,
  },
};

export const testIssuesQueryResult1: IssuesQueryResult = {
  search: {
    issueCount: 2,
    pageInfo: {
      hasNextPage: true,
      endCursor: 'endCursor1',
    },
    nodes: [testIssue1, testIssue2],
  },
};

export const testEmptyIssuesQueryResult1: IssuesQueryResult = {
  search: {
    issueCount: 0,
    pageInfo: {
      hasNextPage: false,
      endCursor: 'endCursor1',
    },
    nodes: [],
  },
};
