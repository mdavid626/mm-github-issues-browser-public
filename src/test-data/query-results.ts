export const issueQueryResult1 = {
  data: {
    repository: {
      id: 'MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==',
      issue: {
        id: 'I_kwDOAJy2Ks5d65oG',
        createdAt: '2023-02-08T08:50:14Z',
        title:
          'Bug: Failed when set "homepage" in package.json or set PUBLIC_URL',
        state: 'CLOSED',
        number: 26126,
        stateReason: 'NOT_PLANNED',
        url: 'https://github.com/facebook/react/issues/26126',
        body: '<!--\r\n  Please provide a clear and concise description of what the bug is. Include\r\n  screenshots if needed. Please test using the latest version of the relevant\r\n  React packages to make sure your issue has not already been fixed.\r\n-->\r\nI want to use basePath in React like Nextjs: [Nextjs basePath](https://nextjs.org/docs/api-reference/next.config.js/basepath)\r\nReact version: 18.2\r\nbasePath:  test\r\n\r\n## Steps To Reproduce\r\n\r\n1. create react app and add homepage like \r\n```\r\n  .....\r\n  "homepage": "/test",\r\n  ....\r\n```\r\n2. build and run with the command: `serve -s build -l 44841 `\r\n3. access in the browser\r\n<!--\r\n  Your bug will get fixed much faster if we can run your code and it doesn\'t\r\n  have dependencies other than React. Issues without reproduction steps or\r\n  code examples may be immediately closed as not actionable.\r\n-->\r\n\r\nLink to code example: None\r\n\r\n<!--\r\n  Please provide a CodeSandbox (https://codesandbox.io/s/new), a link to a\r\n  repository on GitHub, or provide a minimal code example that reproduces the\r\n  problem. You may provide a screenshot of the application if you think it is\r\n  relevant to your bug report. Here are some tips for providing a minimal\r\n  example: https://stackoverflow.com/help/mcve.\r\n-->\r\n\r\n## The current behavior\r\n![image](https://user-images.githubusercontent.com/48717211/217479112-4bfa388b-0ef0-4ea6-ad84-6c490ae4e98f.png)\r\n\r\n## The expected behavior\r\nIt is okay when `npm run start`\r\nbut failed when built\r\n\r\nNote: It\'s still okay when: ` "homepage": "http://localhost:45131",`\r\nnot work:  "homepage": "http://localhost:45131/test" ',
        author: { login: 'ThanhPhucHuynh', __typename: 'User' },
        comments: {
          nodes: [
            {
              id: 'IC_kwDOAJy2Ks5UyCVC',
              createdAt: '2023-02-08T10:52:54Z',
              body: "Support requests filed as GitHub issues often go unanswered. We want you to find the answer you're looking for, so we suggest the following alternatives:\r\n\r\nCoding Questions\r\nIf you have a coding question related to React and React DOM, it might be better suited for Stack Overflow. It's a great place to browse through frequent questions about using React, as well as ask for help with specific questions.\r\n\r\nhttps://stackoverflow.com/questions/tagged/react\r\n\r\nTalk to other React developers\r\nThere are many online forums which are a great place for discussion about best practices and application architecture as well as the future of React.\r\n\r\nhttps://reactjs.org/community/support.html",
              author: { login: 'eps1lon', __typename: 'User' },
              __typename: 'IssueComment',
            },
            {
              id: 'IC_kwDOAJy2Ks5Ux_nZ',
              createdAt: '2023-02-08T10:43:59Z',
              body: 'I tried, just work in dev\n\nOn Wed, Feb 8, 2023, 17:21 Aravind D ***@***.***> wrote:\n\n> how about building like this "homepage": "http://localhost:45131/test" ?\n> Does that work?\n>\n> —\n> Reply to this email directly, view it on GitHub\n> <https://github.com/facebook/react/issues/26126#issuecomment-1422363579>,\n> or unsubscribe\n> <https://github.com/notifications/unsubscribe-auth/ALTV3G6FCM4GWFEYVFXSXZLWWNXTPANCNFSM6AAAAAAUU66TOU>\n> .\n> You are receiving this because you authored the thread.Message ID:\n> ***@***.***>\n>\n',
              author: { login: 'ThanhPhucHuynh', __typename: 'User' },
              __typename: 'IssueComment',
            },
            {
              id: 'IC_kwDOAJy2Ks5Ux4u7',
              createdAt: '2023-02-08T10:21:30Z',
              body: 'how about building like this `"homepage": "http://localhost:45131/test"` ? Does that work?\r\n',
              author: { login: 'arav-ind', __typename: 'User' },
              __typename: 'IssueComment',
            },
          ],
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'Y3Vyc29yOnYyOpK5MjAyMy0wMi0wOFQxMToyMTozMCswMTowMM5Ux4u7',
            __typename: 'PageInfo',
          },
          totalCount: 5,
          __typename: 'IssueCommentConnection',
        },
        __typename: 'Issue',
      },
      __typename: 'Repository',
    },
  },
};

export const commentsQueryResult1 = {
  data: {
    repository: {
      id: 'MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==',
      issue: {
        id: 'I_kwDOAJy2Ks5d65oG',
        comments: {
          nodes: [
            {
              id: 'IC_kwDOAJy2Ks5Ux0zh',
              createdAt: '2023-02-08T10:10:01Z',
              body: "> Are you using react-router-dom? If yes, try adding the attribute basename='/test' to BrowserRouter.\r\n> \r\n> ```\r\n> <BrowserRouter basename='/test'>\r\n>   <Routes>\r\n>      <Route>\r\n>   </Routes>\r\n> </BrowserRouter>\r\n> ```\r\n\r\nI tried but it does not work. I follow [deploying React app into a subdirectory](https://skryvets.com/blog/2018/09/20/an-elegant-solution-of-deploying-react-app-into-a-subdirectory/)\r\nnot work when built and serve it",
              author: { login: 'ThanhPhucHuynh', __typename: 'User' },
              __typename: 'IssueComment',
            },
            {
              id: 'IC_kwDOAJy2Ks5Uxwq-',
              createdAt: '2023-02-08T09:58:14Z',
              body: "Are you using react-router-dom? If yes, try adding the attribute basename='/test' to BrowserRouter.\r\n\r\n```\r\n<BrowserRouter basename='/test'>\r\n  <Routes>\r\n     <Route>\r\n  </Routes>\r\n</BrowserRouter>\r\n```\r\n",
              author: { login: 'arav-ind', __typename: 'User' },
              __typename: 'IssueComment',
            },
          ],
          pageInfo: {
            hasNextPage: false,
            endCursor:
              'Y3Vyc29yOnYyOpK5MjAyMy0wMi0wOFQxMDo1ODoxNCswMTowMM5Uxwq-',
            __typename: 'PageInfo',
          },
          totalCount: 5,
          __typename: 'IssueCommentConnection',
        },
        __typename: 'Issue',
      },
      __typename: 'Repository',
    },
  },
};
