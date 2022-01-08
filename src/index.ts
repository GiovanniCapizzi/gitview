#!/usr/bin/env node
import {execa, ExecaReturnValue} from 'execa';
import {getArgs, printHelp} from './args.js';
import fs from 'fs';
import open from 'open';

const dir = './.git';

const openCommitPage = async (home) => {
    const {stdout} = await execa('git', ['log', '--format="%H"', '-n 1']);
    const commitPage = home.includes('bitbucket') ? '/commits/' : '/commit/';
    await open(home + commitPage + stdout.replace(/"/g, ""));
}

const openIssuesPage = async (home) => {
    await open(home + (home.includes('bitbucket') ? '/jira' : '/issues'));
}

const openHomePage = async (home) => {
    await open('https://' + home.split('/')[2]);
}

const handlers = {
    "commit": openCommitPage,
    "help": printHelp,
    "page": openHomePage,
    "issues": openIssuesPage,
    "repo": open,
    "url": console.log,
}

const parseService = (origin: ExecaReturnValue) => {
    const {stdout} = origin;
    if (stdout.includes('git@')) {
        const parts = /@(.+):(.+).git/g.exec(stdout);
        return 'https://' + parts[1] + "/" + parts[2];
    }
    return /(http.+?)(?:[ ]+|\.git)/g.exec(stdout)[1];
}

const main = async () => {
    if (!fs.existsSync(dir)) {
        console.log('This is not a git repository.');
        printHelp();
        return;
    }
    const args = getArgs();
    if (args) {
        const origin = await execa('git', ['remote', '-v']);
        const home = parseService(origin);
        for (const key of args) {
            await handlers[key](home);
        }
    }
}

main().then();
