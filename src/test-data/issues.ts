import { Issue } from '../types/issue';
import { testAuthor1 } from './authors';
import { testIssueComment1, testIssueComment2 } from './issue-comments';

export const issue1: Issue = {
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
