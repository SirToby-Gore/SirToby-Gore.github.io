
function replaceAll(str: string, oldStr: string, newStr: string): string {
	while (str != str.replace(oldStr, newStr)) {
		str = str.replace(oldStr, newStr);
	}

	return str;
}

function replaceAllFromArray(str: string, oldNewStr: Array<[string, string]>): string {
	for (let i = 0; i < oldNewStr.length; i++) {
		let pair = oldNewStr[i];

		if (pair.length != 2) {
			throw new Error('arrays must be the same length')
		}
		
		str = replaceAll(str, pair[0], pair[1]);
	}

	return str;
}

class Terminal {
	public terminal: HTMLDivElement;
	public terminalText: HTMLParagraphElement;
	public history: Array<string> = [];
	public user: string;
	public machine: string;
	public lastDir: string = '~'
	public currentDir: string = '~';
	public currentLineInput: string = '';
	public cursorHtml: string = '<span class="cursor"></span>'

	constructor(user: string, machine: string) {
		this.user = user;
		this.machine = machine;
		
		this.terminalText = document.createElement('p');
		this.terminal = document.createElement('div');
		this.initTerminal();
		
		this.initTerminal();
		this.initialise();
	}

	public initTerminal() {
		this.terminal.classList.add('terminal');

		
		this.terminalText.classList.add('terminal-text');
		this.terminal.appendChild(this.terminalText);
		
		document.body.appendChild(this.terminal);
	}

	public initialise() {
		this.echo(this.renderMessage(
			[
				` __          ________ _      _____ ____  __  __ ______`,
				` \\ \\        / /  ____| |    / ____/ __ \\|  \\/  |  ____|`,
				`  \\ \\  /\\  / /| |__  | |   | |   | |  | | \\  / | |__   `,
				`   \\ \\/  \\/ / |  __| | |   | |   | |  | | |\\/| |  __|  `,
				`    \\  /\\  /  | |____| |___| |___| |__| | |  | | |____`,
				`     \\/  \\/   |______|______\\_____\\____/|_|  |_|______|`,
			].join('\n')	
		));
	}
	
	public clear() {
		this.terminalText.innerHTML = '';
	}

	public renderMessage(message: string): string {
		return replaceAllFromArray(
			message,
			[
				[' ', '&nbsp;'],
				['\t', '&nbsp;&nbsp;&nbsp;&nbsp;'],
				['\n', '<br>']
			]
		);    
	}

	public echo(message: string, newLine: boolean = true) {
		if (newLine && this.terminalText.innerHTML) {
			this.terminalText.innerHTML += '<br>'
		}
		this.terminalText.innerHTML += message;
	}

	public help() { 
		const commands: Array<string> = [
			'help - shows a list of command',
			'reboot - reboots the computer',
			'clear - clears the screen',
			'echo - puts arguments to stdout'
		];

		for (let i = 0; i < commands.length; i++) { 
			this.echo(commands[i]);
		}
	}

	public async getUserInput(): Promise<string> {
		return new Promise<string>((resolve) => {
		  const validCharacters: RegExp = /^[a-z ".~/-0-9]$/i;

		  const userInputField: HTMLSpanElement = document.createElement('span');

		  this.terminalText.appendChild(userInputField);
	  
		  const handleKeyDown = (event: KeyboardEvent) => {
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

	public async inputLine(): Promise<void> {
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
				}, i * 250)
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

terminal.inputLine()


