import { Issue } from '../types/issue';
import { testAuthor1 } from './authors';
import { testIssueComment1, testIssueComment2 } from './issue-comments';

export const testIssue1: Issue = {
  id: 'I_kwDOAJy2Ks5d65oG',
  createdAt: '2023-02-08T08:50:14Z',
  title: 'Bug: Failed when set homepage in package.json or set PUBLIC_URL',
  state: 'CLOSED',
  number: 26126,
  url: 'https://github.com/facebook/react/issues/26126',
  body: 'test issue1 body',
  author: testAuthor1,
  comments: {
    nodes: [testIssueComment1, testIssueComment2],
    pageInfo: {
      hasNextPage: true,
      endCursor: 'endCursor1',
    },
    totalCount: 2,
  },
};

export const noCommentsIssue1: Issue = {
  id: 'IC_kwDOAJy2Ks5Ux_nZ',
  createdAt: '2022-02-08T08:50:14Z',
  title: 'no comments issue1',
  state: 'CLOSED',
  number: 26127,
  url: 'https://github.com/facebook/react/issues/26127',
  body: 'no comments issue body',
  author: testAuthor1,
  comments: {
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      endCursor: 'endCursor1',
    },
    totalCount: 0,
  },
};
