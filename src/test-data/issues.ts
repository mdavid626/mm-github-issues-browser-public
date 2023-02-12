import { Issue, IssueQueryResult, IssuesItem } from '../types/issue';
import { testAuthor1 } from './authors';
import { testIssueComments1 } from './issue-comments';

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
