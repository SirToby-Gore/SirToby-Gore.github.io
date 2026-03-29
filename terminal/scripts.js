function replaceAll(str, oldStr, newStr) {
    while (str != str.replace(oldStr, newStr)) {
        str = str.replace(oldStr, newStr);
    }
    return str;
}
function replaceAllFromArray(str, oldNewStr) {
    for (let i = 0; i < oldNewStr.length; i++) {
        let pair = oldNewStr[i];
        if (pair.length != 2) {
            throw new Error('arrays must be the same length');
        }
        str = replaceAll(str, pair[0], pair[1]);
    }
    return str;
}
class Terminal {
    terminal;
    terminalText;
    history = [];
    user;
    machine;
    lastDir = '~';
    currentDir = '~';
    currentLineInput = '';
    cursorHtml = '<span class="cursor"></span>';
    constructor(user, machine) {
        this.user = user;
        this.machine = machine;
        this.terminalText = document.createElement('p');
        this.terminal = document.createElement('div');
        this.initTerminal();
        this.initTerminal();
        this.initialise();
    }
    initTerminal() {
        this.terminal.classList.add('terminal');
        this.terminalText.classList.add('terminal-text');
        this.terminal.appendChild(this.terminalText);
        document.body.appendChild(this.terminal);
    }
    initialise() {
        this.echo(this.renderMessage([
            ` __          ________ _      _____ ____  __  __ ______`,
            ` \\ \\        / /  ____| |    / ____/ __ \\|  \\/  |  ____|`,
            `  \\ \\  /\\  / /| |__  | |   | |   | |  | | \\  / | |__   `,
            `   \\ \\/  \\/ / |  __| | |   | |   | |  | | |\\/| |  __|  `,
            `    \\  /\\  /  | |____| |___| |___| |__| | |  | | |____`,
            `     \\/  \\/   |______|______\\_____\\____/|_|  |_|______|`,
        ].join('\n')));
    }
    clear() {
        this.terminalText.innerHTML = '';
    }
    renderMessage(message) {
        return replaceAllFromArray(message, [
            [' ', '&nbsp;'],
            ['\t', '&nbsp;&nbsp;&nbsp;&nbsp;'],
            ['\n', '<br>']
        ]);
    }
    echo(message, newLine = true) {
        if (newLine && this.terminalText.innerHTML) {
            this.terminalText.innerHTML += '<br>';
        }
        this.terminalText.innerHTML += message;
    }
    help() {
        const commands = [
            'help - shows a list of command',
            'reboot - reboots the computer',
            'clear - clears the screen',
            'echo - puts arguments to stdout'
        ];
        for (let i = 0; i < commands.length; i++) {
            this.echo(commands[i]);
        }
    }
    async getUserInput() {
        return new Promise((resolve) => {
            const validCharacters = /^[a-z ".~/-0-9]$/i;
            const userInputField = document.createElement('span');
            this.terminalText.appendChild(userInputField);
            const handleKeyDown = (event) => {
                this.terminalText.innerHTML = this.terminalText.innerHTML.substring(0, this.terminalText.innerHTML.length - this.cursorHtml.length);
                // console.log(`"${event.key}"`, `valid char: ${validCharacters.test(event.key)}`);
                if (event.key === 'Enter') {
                    removeEventListener('keydown', handleKeyDown);
                    return resolve(userInputField.innerHTML);
                }
                else if (validCharacters.test(event.key)) {
                    userInputField.innerHTML += event.key;
                }
                else if (event.key === 'Backspace') {
                    userInputField.innerHTML = userInputField.innerHTML.slice(0, -1);
                }
                this.terminalText.innerHTML += this.cursorHtml;
            };
            addEventListener('keydown', handleKeyDown);
        });
    }
    async inputLine() {
        this.echo(`${this.user}@${this.machine}: ${this.currentDir} $ `);
        const userInput = await this.getUserInput();
        this.history.push(userInput);
        if (userInput == 'reboot') {
            this.echo('rebooting');
            setTimeout(() => {
                window.location.href = window.location.href;
            }, 1000);
            for (let i = 1; i < 4; i++) {
                setTimeout(() => {
                    this.echo('.', false);
                }, i * 250);
            }
            return;
        }
        else if (userInput == 'clear') {
            this.clear();
        }
        else if (userInput == 'help') {
            this.help();
        }
        else if (userInput.startsWith('echo ')) {
            this.echo(userInput.split(' ').slice(1).join(' '));
        }
        else if (userInput.startsWith('cd ') && userInput.split(' ')[1].length >= 1) {
            this.currentDir = userInput.split(' ')[1];
        }
        // else if ()
        else {
            this.echo(`command not found: ${userInput}`);
        }
        this.inputLine();
    }
}
const terminal = new Terminal('user', 'linux');
terminal.inputLine();
