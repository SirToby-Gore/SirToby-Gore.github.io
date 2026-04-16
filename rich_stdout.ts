export enum Colour {
    FOREGROUND_BLACK = 30,
    FOREGROUND_RED = 31,
    FOREGROUND_GREEN = 32,
    FOREGROUND_YELLOW = 33,
    FOREGROUND_BLUE = 34,
    FOREGROUND_PURPLE = 35,
    FOREGROUND_LIGHT_BLUE = 36,
    FOREGROUND_WHITE = 37,
    SET_FOREGROUND = 38,
    DEFAULT_FOREGROUND = 39,
    BACKGROUND_BLACK = 40,
    BACKGROUND_RED = 41,
    BACKGROUND_GREEN = 42,
    BACKGROUND_YELLOW = 43,
    BACKGROUND_BLUE = 44,
    BACKGROUND_PURPLE = 45,
    BACKGROUND_LIGHT_BLUE = 46,
    BACKGROUND_WHITE = 47,
    SET_BACKGROUND = 48,
    DEFAULT_BACKGROUND = 49,
}

export enum Font {
    SET_DEFAULT = 10,
    FONT_1 = 11,
    FONT_2 = 12,
    FONT_3 = 13,
    FONT_4 = 14,
    FONT_5 = 15,
    FONT_6 = 16,
    FONT_7 = 17,
    FONT_8 = 18,
    FONT_9 = 19,
    FRAKTUR = 20,
}

export enum Effect {
    RESET = 0,
    BOLD = 1,
    FAINT = 2,
    ITALIC = 3,
    UNDERLINED = 4,
    SLOW_BLINK = 5,
    RAPID_BLINK = 6,
    SWAP_FORE_AND_BACK = 7,
    CONCEAL = 8,
    STRIKE_THROUGH = 9,
    BOLD_OR_DOUBLE_UNDERLINE = 21,
    NORMAL_FONT_WEIGHT = 22,
    NOT_ITALIC_NOT_FRAKTUR = 23,
    UNDERLINE_OFF = 24,
    BLINK_OFF = 25,
    INVERSE = 27,
    REVEAL = 28,
    NOT_STRIKE_THROUGH = 29,
    FRAMED = 51,
    ENCIRCLED = 52,
    OVERLINED = 53,
    NOT_FRAMED_NOT_ENCIRCLED = 54,
    NOT_OVERLINED = 55,
}

export enum Ideogram {
    UNDERLINE = 60,
    DOUBLE_UNDERLINE = 61,
    OVERLINE = 62,
    DOUBLE_OVERLINE = 63,
    STRESS_MARKING = 64,
    ATTRIBUTES_OFF = 65,
}

export interface TerminalConfig {
    rows?: number;
    columns?: number;
    outputPointId?: string;
    ansi?: boolean;
}

export interface PrintOptions {
    text: string;
    effects?: number[];
    new_line?: boolean;
    reset_style?: boolean;
}

export interface TableOptions {
    object: any;
    colour_pairings?: Record<string, number[]>;
    tab?: string;
    indent?: number;
}

export class Ansi {
    static construct(effects: number[]): string {
        if (effects.length === 0) return "";
        return `\x1B[${effects.join(";")}m`;
    }
}

export class Terminal {
    private _NEW_LINE_ITEM: string = `\n<br>\n`;
    private _FIRST_LINE: boolean = true;
    public columns: number;
    public rows: number;
    private _OUTPUT_POINT: HTMLDivElement;
    private _ANSI: boolean;

    constructor({ rows = 0, columns = 0, outputPointId = "rich-stdout-terminal", ansi = true }: TerminalConfig = {}) {
        this._OUTPUT_POINT = document.getElementById(outputPointId) as HTMLDivElement;
        this._ANSI = ansi;

        const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

        this.rows = rows > 0 ? rows : Math.floor(this._OUTPUT_POINT.offsetHeight / remSize);
        this.columns = columns > 0 ? columns : Math.floor(this._OUTPUT_POINT.offsetWidth / (remSize / 2));

        this.setupGrid();
    }

    private setupGrid() {
        let html = "";
        for (let i = 0; i < this.rows; i++) {
            html += `<div class="row">` + `<span class="cell"></span>`.repeat(this.columns) + `</div>`;
        }
        this._OUTPUT_POINT.innerHTML = html;
    }

    private write(message: string): void {
        console.log(message); 
    }

    public print({ text = "", effects = [], new_line = true, reset_style = true }: PrintOptions): void {
        let output = text;
        if (this._ANSI) {
            if (this._FIRST_LINE) {
                this._FIRST_LINE = false;
                new_line = false;
            }
            output = Ansi.construct(effects) + output;
            if (reset_style) output += Ansi.construct([Effect.RESET]);
        }

        if (new_line) this.write(this._NEW_LINE_ITEM);
        this.write(output);
    }

    public error({ text, new_line = true }: { text: string; new_line?: boolean }): void {
        this._ANSI 
            ? this.print({ text, effects: [Effect.BOLD, Colour.FOREGROUND_RED], new_line })
            : this.print({ text: `ERROR: ${text}`, new_line });
    }

    public warning(text: string, new_line: boolean = true): void {
        this._ANSI 
            ? this.print({ text, effects: [Effect.BOLD, Colour.FOREGROUND_YELLOW], new_line })
            : this.print({ text: `WARNING: ${text}`, new_line });
    }

    public table({ 
        object, 
        colour_pairings = {
            "string": [Colour.FOREGROUND_GREEN],
            "number": [Colour.FOREGROUND_BLUE],
            "boolean": [Colour.FOREGROUND_YELLOW],
            "object": [Colour.FOREGROUND_LIGHT_BLUE, Effect.FAINT],
        },
        tab = "  ",
        indent = 0 
    }: TableOptions): void {
        
        const formatData = (data: any, depth: number): string => {
            const type = typeof data;
            let style = this._ANSI ? Ansi.construct(colour_pairings[type] || []) : "";
            let reset = this._ANSI ? Ansi.construct([Effect.RESET]) : "";
            
            if (data === null) return `${style}null${reset}`;
            
            if (Array.isArray(data)) {
                const content = data.map(item => `${tab.repeat(depth + 1)}${formatData(item, depth + 1)}`).join(",\n");
                return `[\n${content}\n${tab.repeat(depth)}]`;
            }

            if (type === "object") {
                const content = Object.entries(data)
                    .map(([k, v]) => `${tab.repeat(depth + 1)}${k}: ${formatData(v, depth + 1)}`)
                    .join(",\n");
                return `{\n${content}\n${tab.repeat(depth)}}`;
            }

            return `${style}${JSON.stringify(data)}${reset}`;
        };

        this.print({ text: formatData(object, indent) });
    }

    public clear(): void { if (this._ANSI) this.write(`\x1B[2J`); }
    public move_cursor(x: number, y: number): void { if (this._ANSI) this.write(`\x1B[${y};${x}H`); }
}