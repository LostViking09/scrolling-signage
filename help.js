import commandLineUsage from 'command-line-usage';

export function displayHelp() {
    const sections = [
        {
            header: 'Scrolling Signage',
            content: 'An Electron-based application for displaying and auto-scrolling web content. Perfect for digital signage and information displays.'
        },
        {
            header: 'Options',
            optionList: [
                {
                    name: 'url',
                    alias: 'u',
                    typeLabel: '{underline url}',
                    description: 'The URL to display. Must use format: --url="https://example.com" or -u="https://example.com"',
                    defaultValue: 'https://longdogechallenge.com/'
                },
                {
                    name: 'scrollpercent',
                    alias: 's',
                    typeLabel: '{underline number}',
                    description: 'How much to scroll each interval, as a percentage of the viewport height.',
                    defaultValue: 0.25
                },
                {
                    name: 'scrollinterval',
                    alias: 'i',
                    typeLabel: '{underline ms}',
                    description: 'How often to scroll, in milliseconds.',
                    defaultValue: 2000
                },
                {
                    name: 'reloadinterval',
                    alias: 'r',
                    typeLabel: '{underline minutes}',
                    description: 'How often to reload the page, in minutes.',
                    defaultValue: 5
                },
                {
                    name: 'zoom',
                    alias: 'z',
                    typeLabel: '{underline number}',
                    description: 'Zoom level for the displayed content.',
                    defaultValue: 1.0
                },
                {
                    name: 'hideCss',
                    alias: 'h',
                    typeLabel: '{underline selector}',
                    description: 'CSS selector for elements to hide. Must use format: --hideCss=".selector" or -h=".selector"',
                    defaultValue: ''
                }
            ]
        },
        {
            header: 'Examples',
            content: [
                {
                    desc: '1. Display a website with default settings (note the required = and quotes)',
                    example: '$ scrolling-signage --url="https://example.com"'
                },
                {
                    desc: '2. Custom scroll settings (string options require = and quotes)',
                    example: '$ scrolling-signage -u="https://example.com" -s 0.5 -i 3000'
                },
                {
                    desc: '3. Hide elements and set zoom (note = and quotes for strings)',
                    example: '$ scrolling-signage -u="https://example.com" -z 1.5 -h=".ad-banner, #cookie-notice"'
                }
            ]
        }
    ];

    return commandLineUsage(sections);
}
