#!/usr/bin/env node

import meow from 'meow';

import { GithubVisitor } from './utilities.js';

const maxCount = 100;

const cli = meow(
  `
	Usage
	  $ fake-github-visitor
  Options
    --username
    --count [ max is 100 ]
	Examples
	  $ fake-github-visitor --username=AungMyoKyaw --count=10
`,
  {
    importMeta: import.meta,
    flags: {
      username: {
        type: 'string',
        isRequired: true,
      },
      count: {
        type: 'number',
        isRequired: false,
        default: 10,
      },
    },
  }
);

const { username } = cli.flags;
let { count } = cli.flags;
if (count > maxCount) {
  count = 100;
}
const githubVisitor = new GithubVisitor(username, count);

(async () => {
  await githubVisitor.fake();
})();
