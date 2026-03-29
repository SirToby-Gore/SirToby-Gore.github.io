function strCount(haystack, needle) {
    let count = 0;
    for (let index = 0; index < haystack.length - needle.length; index++) {
        const substring = haystack.substring(index, index + needle.length);
        if (substring == needle) {
            count++;
        }
    }
    return count;
}
class LinuxFile {
    name;
    body;
    binary;
    isExecutable;
    constructor(name, body = '', binary = null, isExecutable = false) {
        this.name = name;
        this.body = body;
        this.binary = binary;
        this.isExecutable = isExecutable;
    }
}
class LinuxDirectory {
    name;
    parent;
    children = [];
    constructor(name, parent = null) {
        this.name = name;
        this.parent = parent;
    }
    findChild(name) {
        return this.children.find(child => child.name === name);
    }
}
class Terminal {
    root;
    currentDir;
    env = new Map();
    terminalElement;
    user;
    machine;
    builtIns = new Map();
    history = [];
    constructor(user, machine, containerId) {
        this.user = user;
        this.machine = machine;
        const el = document.getElementById(containerId);
        if (!el)
            throw new Error(`Container #${containerId} not found`);
        this.terminalElement = el;
        // Initialize Filesystem
        this.root = new LinuxDirectory('/');
        this.currentDir = this.root;
        this.setUpBuiltIns();
        this.setupFileSystem();
        // Initialize Environment
        this.env.set('HOME', '/home/user');
        this.env.set('USER', user);
        // Start UI
        this.boot();
    }
    setupFileSystem() {
        const bin = new LinuxDirectory('bin', this.root);
        this.root.children.push(bin);
        this.populateBinDirectory(bin);
        const opt = new LinuxDirectory('opt', this.root);
        this.root.children.push(opt);
        const home = new LinuxDirectory('home', this.root);
        const userDir = new LinuxDirectory(this.user, home);
        const readme = new LinuxFile('readme.txt', 'Welcome! This is a filesystem-driven terminal.\nCommands are files in /bin.');
        userDir.children.push(readme);
        home.children.push(userDir);
        this.root.children.push(home);
        this.currentDir = userDir;
    }
    setUpBuiltIns() {
        // cd: Change Directory
        this.builtIns.set('cd', (args) => {
            const targetPath = args[0] || '~';
            const target = this.resolvePath(targetPath);
            if (target instanceof LinuxDirectory) {
                this.currentDir = target;
                return { stderr: null, stdout: null, exitCode: 0 };
            }
            else {
                return { stderr: `bash: cd: ${targetPath}: No such file or directory`, stdout: null, exitCode: 1 };
            }
        });
        // echo: Print text (Bash prioritizes its built-in echo over /bin/echo)
        this.builtIns.set('echo', (args) => {
            // Handle environment variables like `echo $USER`
            const output = args.map(arg => {
                if (arg.startsWith('$')) {
                    const varName = arg.slice(1);
                    return this.env.get(varName) || '';
                }
                return arg;
            }).join(' ');
            return { stderr: null, stdout: output, exitCode: 0 };
        });
        // history: Show previously typed commands
        this.builtIns.set('history', (args) => {
            const output = this.history.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n');
            return { stderr: null, stdout: output, exitCode: 0 };
        });
        // export: Set environment variables
        this.builtIns.set('export', (args) => {
            if (!args[0] || !args[0].includes('=')) {
                return { stderr: "bash: export: usage: export VAR=value\nInvalid syntax", stdout: null, exitCode: 1 };
            }
            const [key, value] = args[0].split('=');
            this.env.set(key, value);
            return { stderr: null, stdout: null, exitCode: 0 };
        });
        // exit: Close terminal
        this.builtIns.set('exit', (args) => {
            this.print('logout');
            setTimeout(() => window.location.reload(), 500);
            return { stderr: null, stdout: null, exitCode: 0 };
        });
        this.builtIns.set('help', (args) => {
            const output = [];
            output.push('/white/System Binaries:/end/');
            const binDir = this.root.findChild('bin');
            if (binDir) {
                output.push(binDir.children.map(c => c.name).join(' '));
            }
            output.push('\n/white/Shell Builtins:/end/');
            output.push(Array.from(this.builtIns.keys()).join(' '));
            output.push('\n/white/Installed Binaries:/end/');
            const optDir = this.root.findChild('opt');
            if (optDir) {
                output.push(optDir.children.map(c => c.name).join(' '));
            }
            return {
                exitCode: 0,
                stderr: null,
                stdout: output.join('\n'),
            };
        });
        // Fixed install command
        this.builtIns.set('install', (args) => {
            if (args.length === 0) {
                return { stdout: null, stderr: `usage: install [URL]`, exitCode: 1 };
            }
            // Using a standard loop so we can return a valid LinuxProgramExit
            for (const url of args) {
                const request = new XMLHttpRequest();
                request.open('GET', `${url}/header.json`, false);
                try {
                    request.send(null);
                    if (request.status !== 200) {
                        return { stdout: null, stderr: `Could not find package at ${url}`, exitCode: 2 };
                    }
                    const data = JSON.parse(request.responseText);
                    const name = data.name; // Fixed: JSON objects use dot notation, not .get()
                    const mainFile = data.main;
                    if (!name || !mainFile) {
                        return { stdout: null, stderr: `Invalid package manifest at ${url}`, exitCode: 3 };
                    }
                    // Check if already installed
                    const opt = this.root.findChild('opt');
                    if (opt.findChild(name)) {
                        return { stdout: null, stderr: `Package ${name} is already installed`, exitCode: 5 };
                    }
                    // Fetch the actual binary body
                    const packageRequest = new XMLHttpRequest();
                    packageRequest.open('GET', `${url}/${mainFile}`, false);
                    packageRequest.send(null);
                    if (packageRequest.status === 200) {
                        opt.children.push(new LinuxFile(name, packageRequest.responseText));
                        return { stdout: `Successfully installed ${name}`, stderr: null, exitCode: 0 };
                    }
                }
                catch (e) {
                    return { stdout: null, stderr: 'Network error during installation', exitCode: 2 };
                }
            }
            return { stdout: null, stderr: "Installation failed", exitCode: 1 };
        });
    }
    system(line) {
        const [cmd, ...args] = line.split(/\s+/);
        const builtIn = this.builtIns.get(cmd);
        if (builtIn) {
            return builtIn(args);
        }
        const binDir = this.root.findChild('bin');
        const program = binDir.findChild(cmd);
        if (program instanceof LinuxFile && program.binary) {
            return program.binary(args);
        }
        const optDir = this.root.findChild('opt');
        const optProgram = optDir.findChild(cmd) || null;
        if (optProgram) {
            let stdout = null;
            let stderr = null;
            let exitCode = 0;
            const result = eval(optProgram.body);
            return {
                stdout: stdout,
                stderr: stderr,
                exitCode: exitCode,
            };
        }
        return {
            stdout: null,
            stderr: `bash: ${cmd}: command not found`,
            exitCode: 1,
        };
    }
    populateBinDirectory(binDir) {
        const commands = {
            // ls: List directory contents
            'ls': (args) => {
                const targetPath = args[0] || '.';
                const target = this.resolvePath(targetPath);
                if (target instanceof LinuxDirectory) {
                    const list = target.children.map(c => c instanceof LinuxDirectory ? `/blue/${c.name}//end/` : `/white/${c.name}/end/`).join('  ');
                    return { stdout: list, stderr: null, exitCode: 0 };
                }
                return { stdout: null, stderr: `ls: cannot access '${targetPath}': No such file or directory`, exitCode: 1 };
            },
            // cat: Read file contents
            'cat': (args) => {
                if (!args[0])
                    return { stdout: null, stderr: 'No file', exitCode: 1 };
                const file = this.resolvePath(args[0]);
                if (file instanceof LinuxFile) {
                    return { stdout: file.body, stderr: null, exitCode: 0 };
                }
                return { stdout: null, stderr: 'Not found', exitCode: 1 };
            },
            // mkdir: Create a directory
            'mkdir': (args) => {
                if (!args[0]) {
                    return { stdout: null, stderr: 'mkdir: missing operand', exitCode: 1 };
                }
                const dirName = args[0];
                // Prevent duplicates
                if (this.currentDir.findChild(dirName)) {
                    return { stdout: null, stderr: `mkdir: cannot create directory '${dirName}': File exists\nFile exists`, exitCode: 1 };
                }
                this.currentDir.children.push(new LinuxDirectory(dirName, this.currentDir));
                return { stdout: null, stderr: null, exitCode: 0 };
            },
            // touch: Create an empty file
            'touch': (args) => {
                if (!args[0]) {
                    return { stdout: null, stderr: 'touch: missing file operand', exitCode: 1 };
                }
                const fileName = args[0];
                if (!this.currentDir.findChild(fileName)) {
                    this.currentDir.children.push(new LinuxFile(fileName, ''));
                }
                return { stdout: null, stderr: null, exitCode: 0 };
            },
            // rm: Remove a file (or directory if we implemented -rf)
            'rm': (args) => {
                if (!args[0]) {
                    return { stdout: null, stderr: 'rm: missing operand', exitCode: 1 };
                }
                const target = this.resolvePath(args[0]);
                if (!target) {
                    return { stdout: null, stderr: `rm: cannot remove '${args[0]}': No such file or directory`, exitCode: 1 };
                }
                if (target instanceof LinuxDirectory) {
                    return { stdout: null, stderr: `rm: cannot remove '${args[0]}': Is a directory`, exitCode: 1 };
                }
                // Remove the file from its parent's children array
                const parent = this.currentDir; // Simplification: assuming local file for now
                parent.children = parent.children.filter(c => c.name !== target.name);
                return { stdout: null, stderr: null, exitCode: 0 };
            },
            // clear: Clear the screen
            'clear': (args) => {
                this.terminalElement.innerHTML = '';
                return { stdout: null, stderr: null, exitCode: 0 };
            },
            // whoami: Print current user
            'whoami': (args) => {
                const user = this.env.get('USER') || this.user;
                return { stdout: user, stderr: null, exitCode: 0 };
            },
            // date: Print current date and time
            'date': (args) => {
                const now = new Date().toString();
                return { stdout: now, stderr: null, exitCode: 0 };
            },
            // pwd: Print Working Directory
            'pwd': (args) => {
                const path = this.getFullPath(this.currentDir);
                return { stderr: null, stdout: path, exitCode: 0 };
            },
        };
        // Convert the dictionary into actual LinuxFile instances
        for (const [name, func] of Object.entries(commands)) {
            binDir.children.push(new LinuxFile(name, 'ELF 64-bit LSB executable', func, true));
        }
    }
    getFullPath(dir) {
        let path = '';
        let curr = dir;
        while (curr && curr.name !== '/') {
            path = '/' + curr.name + path;
            curr = curr.parent;
        }
        return path || '/';
    }
    resolvePath(path) {
        if (path === '/')
            return this.root;
        if (path === '~')
            return this.resolvePath(this.env.get('HOME') || '/');
        const parts = path.split('/').filter(p => p !== '');
        let current = path.startsWith('/') ? this.root : this.currentDir;
        for (const part of parts) {
            if (part === '.')
                continue;
            if (part === '..') {
                if (current.parent)
                    current = current.parent;
                continue;
            }
            if (current instanceof LinuxDirectory) {
                const next = current.findChild(part);
                if (!next)
                    return null;
                current = next;
            }
            else {
                return null;
            }
        }
        return current;
    }
    renderForHtml(message) {
        let rendered = message
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('\\', '&#92;')
            .replaceAll('\t', '&nbsp;&nbsp;&nbsp;&nbsp;')
            .replaceAll('\n', '<br>')
            .replaceAll(' ', '&nbsp;')
            .replaceAll('/end/', '</span>')
            .replaceAll('/red', '<span class="red-text">')
            .replaceAll('/orange', '<span class="orange-text">')
            .replaceAll('/yellow', '<span class="yellow-text">')
            .replaceAll('/green/', '<span class="green-text">')
            .replaceAll('/blue/', '<span class="blue-text">')
            .replaceAll('/purple', '<span class="purple-text">')
            .replaceAll('/black', '<span class="black-text">')
            .replaceAll('/white/', '<span class="white-text">');
        while (strCount(message, '<span ') > strCount(message, '</span>')) {
            message += '</span>';
        }
        return rendered;
    }
    print(message, isPrompt = false, render = true) {
        const div = document.createElement('div');
        div.className = isPrompt ? 'prompt-line' : 'output-line';
        message = render ? this.renderForHtml(message) : message;
        if (!isPrompt) {
            div.innerHTML = message;
        }
        else {
            div.innerHTML = message;
        }
        this.terminalElement.appendChild(div);
        this.terminalElement.scrollTop = this.terminalElement.scrollHeight;
    }
    async boot() {
        this.print(` __          ________ _      _____ ____  __  __ ______`);
        this.print(` \\ \\        / /  ____| |    / ____/ __ \\|  \\/  |  ____|`);
        this.print(`  \\ \\  /\\  / /| |__  | |   | |   | |  | | \\  / | |__   `);
        this.print(`   \\ \\/  \\/ / |  __| | |   | |   | |  | | |\\/| |  __|  `);
        this.print(`    \\  /\\  /  | |____| |___| |___| |__| | |  | | |____`);
        this.print(`     \\/  \\/   |______|______\\_____\\____/|_|  |_|______|`);
        this.print('\nSystem initialized. Type "help" for commands.');
        // await this.execute('install https://sir.toby-gore.github.io/terminal/example-mod');
        this.loop();
    }
    async loop() {
        while (true) {
            try {
                const path = this.getFullPath(this.currentDir);
                const promptHtml = `/green/${this.user}@${this.machine}/end/:/blue/${path}/end/$ `;
                this.print(promptHtml, true);
                const input = await this.readInput();
                await this.execute(input);
            }
            catch (e) {
                this.print(`an error occurred ${e}`);
            }
        }
    }
    readInput() {
        return new Promise((resolve) => {
            const inputWrapper = document.createElement('span');
            const textContent = document.createElement('span');
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.innerHTML = '&nbsp;';
            inputWrapper.appendChild(textContent);
            inputWrapper.appendChild(cursor);
            const lines = this.terminalElement.querySelectorAll('.prompt-line');
            const lastLine = lines[lines.length - 1];
            if (lastLine) {
                lastLine.appendChild(inputWrapper);
            }
            const handleKey = (e) => {
                if (e.key === 'Enter') {
                    window.removeEventListener('keydown', handleKey);
                    cursor.remove();
                    resolve(textContent.innerText);
                }
                else if (e.key === 'Backspace') {
                    textContent.innerText = textContent.innerText.slice(0, -1);
                }
                else if (e.key.length === 1) {
                    textContent.innerText += e.key;
                }
                this.terminalElement.scrollTop = this.terminalElement.scrollHeight;
            };
            window.addEventListener('keydown', handleKey);
        });
    }
    async execute(rawLine) {
        const line = rawLine.trim();
        if (!line)
            return;
        const { stdout, stderr, exitCode } = this.system(line);
        if (stderr) {
            this.print(stderr);
            return;
        }
        if (stdout) {
            this.print(stdout);
        }
    }
}
new Terminal('user', 'linux', 'app');
