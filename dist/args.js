import commandLineUsage from 'command-line-usage';
import commandLineArgs from 'command-line-args';
const optionDefinitions = [
    { name: 'commit', alias: 'c', type: Boolean },
    { name: 'page', alias: 'p', type: Boolean },
    { name: 'issues', alias: 'i', type: Boolean },
    { name: 'repo', alias: 'r', type: Boolean },
    { name: 'url', alias: 'u', type: Boolean },
    { name: 'help', type: Boolean },
];
const usage = commandLineUsage([
    {
        header: 'A simple git shortcut',
        content: 'Open useful web pages of a git repository.'
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'commit',
                description: 'Show the latest commit page of the project.',
                alias: 'c',
                type: Boolean
            },
            {
                name: 'page',
                description: 'Show the homepage of the git endpoint.',
                alias: 'p',
                type: Boolean
            },
            {
                name: 'issues',
                description: 'Show the issues page of the project (opens Jira on BitBucket).',
                alias: 'i',
                type: Boolean
            },
            {
                name: 'repo',
                description: 'Show the git repository page of the project.',
                alias: 'r',
                type: Boolean
            },
            {
                name: 'url',
                description: 'Display the url of the project.',
                alias: 'u',
                type: Boolean
            },
            {
                name: 'help',
                description: 'Display this help message.',
                type: Boolean
            },
        ]
    },
    {
        content: 'Project home: {underline https://github.com/giovannicapizzi/gitview}'
    }
]);
export const printHelp = () => console.log(usage);
export const getArgs = () => {
    try {
        const args = commandLineArgs(optionDefinitions);
        return Object.keys(args);
    }
    catch (e) {
        console.log(e.message + '\nUsage:\n' + usage);
    }
    return null;
};
//# sourceMappingURL=args.js.map