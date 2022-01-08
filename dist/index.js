#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { execa } from 'execa';
import { getArgs, printHelp } from './args.js';
import fs from 'fs';
import open from 'open';
const dir = './.git';
const openCommitPage = (home) => __awaiter(void 0, void 0, void 0, function* () {
    const { stdout } = yield execa('git', ['log', '--format="%H"', '-n 1']);
    const commitPage = home.includes('bitbucket') ? '/commits/' : '/commit/';
    yield open(home + commitPage + stdout.replace(/"/g, ""));
});
const openIssuesPage = (home) => __awaiter(void 0, void 0, void 0, function* () {
    yield open(home + (home.includes('bitbucket') ? '/jira' : '/issues'));
});
const openHomePage = (home) => __awaiter(void 0, void 0, void 0, function* () {
    yield open('https://' + home.split('/')[2]);
});
const handlers = {
    "commit": openCommitPage,
    "help": printHelp,
    "page": openHomePage,
    "issues": openIssuesPage,
    "repo": open,
    "url": console.log,
};
const parseService = (origin) => {
    const { stdout } = origin;
    if (stdout.includes('git@')) {
        const parts = /@(.+):(.+).git/g.exec(stdout);
        return 'https://' + parts[1] + "/" + parts[2];
    }
    return /(http.+?)(?:[ ]+|\.git)/g.exec(stdout)[1];
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!fs.existsSync(dir)) {
        console.log('This is not a git repository.');
        printHelp();
        return;
    }
    const args = getArgs();
    if (args) {
        const origin = yield execa('git', ['remote', '-v']);
        const home = parseService(origin);
        for (const key of args) {
            yield handlers[key](home);
        }
    }
});
main().then();
//# sourceMappingURL=index.js.map