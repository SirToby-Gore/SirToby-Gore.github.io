export var Colour;
(function (Colour) {
    Colour[Colour["FOREGROUND_BLACK"] = 30] = "FOREGROUND_BLACK";
    Colour[Colour["FOREGROUND_RED"] = 31] = "FOREGROUND_RED";
    Colour[Colour["FOREGROUND_GREEN"] = 32] = "FOREGROUND_GREEN";
    Colour[Colour["FOREGROUND_YELLOW"] = 33] = "FOREGROUND_YELLOW";
    Colour[Colour["FOREGROUND_BLUE"] = 34] = "FOREGROUND_BLUE";
    Colour[Colour["FOREGROUND_PURPLE"] = 35] = "FOREGROUND_PURPLE";
    Colour[Colour["FOREGROUND_LIGHT_BLUE"] = 36] = "FOREGROUND_LIGHT_BLUE";
    Colour[Colour["FOREGROUND_WHITE"] = 37] = "FOREGROUND_WHITE";
    Colour[Colour["SET_FOREGROUND"] = 38] = "SET_FOREGROUND";
    Colour[Colour["DEFAULT_FOREGROUND"] = 39] = "DEFAULT_FOREGROUND";
    Colour[Colour["BACKGROUND_BLACK"] = 40] = "BACKGROUND_BLACK";
    Colour[Colour["BACKGROUND_RED"] = 41] = "BACKGROUND_RED";
    Colour[Colour["BACKGROUND_GREEN"] = 42] = "BACKGROUND_GREEN";
    Colour[Colour["BACKGROUND_YELLOW"] = 43] = "BACKGROUND_YELLOW";
    Colour[Colour["BACKGROUND_BLUE"] = 44] = "BACKGROUND_BLUE";
    Colour[Colour["BACKGROUND_PURPLE"] = 45] = "BACKGROUND_PURPLE";
    Colour[Colour["BACKGROUND_LIGHT_BLUE"] = 46] = "BACKGROUND_LIGHT_BLUE";
    Colour[Colour["BACKGROUND_WHITE"] = 47] = "BACKGROUND_WHITE";
    Colour[Colour["SET_BACKGROUND"] = 48] = "SET_BACKGROUND";
    Colour[Colour["DEFAULT_BACKGROUND"] = 49] = "DEFAULT_BACKGROUND";
})(Colour || (Colour = {}));
export var Font;
(function (Font) {
    Font[Font["SET_DEFAULT"] = 10] = "SET_DEFAULT";
    Font[Font["FONT_1"] = 11] = "FONT_1";
    Font[Font["FONT_2"] = 12] = "FONT_2";
    Font[Font["FONT_3"] = 13] = "FONT_3";
    Font[Font["FONT_4"] = 14] = "FONT_4";
    Font[Font["FONT_5"] = 15] = "FONT_5";
    Font[Font["FONT_6"] = 16] = "FONT_6";
    Font[Font["FONT_7"] = 17] = "FONT_7";
    Font[Font["FONT_8"] = 18] = "FONT_8";
    Font[Font["FONT_9"] = 19] = "FONT_9";
    Font[Font["FRAKTUR"] = 20] = "FRAKTUR";
})(Font || (Font = {}));
export var Effect;
(function (Effect) {
    Effect[Effect["RESET"] = 0] = "RESET";
    Effect[Effect["BOLD"] = 1] = "BOLD";
    Effect[Effect["FAINT"] = 2] = "FAINT";
    Effect[Effect["ITALIC"] = 3] = "ITALIC";
    Effect[Effect["UNDERLINED"] = 4] = "UNDERLINED";
    Effect[Effect["SLOW_BLINK"] = 5] = "SLOW_BLINK";
    Effect[Effect["RAPID_BLINK"] = 6] = "RAPID_BLINK";
    Effect[Effect["SWAP_FORE_AND_BACK"] = 7] = "SWAP_FORE_AND_BACK";
    Effect[Effect["CONCEAL"] = 8] = "CONCEAL";
    Effect[Effect["STRIKE_THROUGH"] = 9] = "STRIKE_THROUGH";
    Effect[Effect["BOLD_OR_DOUBLE_UNDERLINE"] = 21] = "BOLD_OR_DOUBLE_UNDERLINE";
    Effect[Effect["NORMAL_FONT_WEIGHT"] = 22] = "NORMAL_FONT_WEIGHT";
    Effect[Effect["NOT_ITALIC_NOT_FRAKTUR"] = 23] = "NOT_ITALIC_NOT_FRAKTUR";
    Effect[Effect["UNDERLINE_OFF"] = 24] = "UNDERLINE_OFF";
    Effect[Effect["BLINK_OFF"] = 25] = "BLINK_OFF";
    Effect[Effect["INVERSE"] = 27] = "INVERSE";
    Effect[Effect["REVEAL"] = 28] = "REVEAL";
    Effect[Effect["NOT_STRIKE_THROUGH"] = 29] = "NOT_STRIKE_THROUGH";
    Effect[Effect["FRAMED"] = 51] = "FRAMED";
    Effect[Effect["ENCIRCLED"] = 52] = "ENCIRCLED";
    Effect[Effect["OVERLINED"] = 53] = "OVERLINED";
    Effect[Effect["NOT_FRAMED_NOT_ENCIRCLED"] = 54] = "NOT_FRAMED_NOT_ENCIRCLED";
    Effect[Effect["NOT_OVERLINED"] = 55] = "NOT_OVERLINED";
})(Effect || (Effect = {}));
export var Ideogram;
(function (Ideogram) {
    Ideogram[Ideogram["UNDERLINE"] = 60] = "UNDERLINE";
    Ideogram[Ideogram["DOUBLE_UNDERLINE"] = 61] = "DOUBLE_UNDERLINE";
    Ideogram[Ideogram["OVERLINE"] = 62] = "OVERLINE";
    Ideogram[Ideogram["DOUBLE_OVERLINE"] = 63] = "DOUBLE_OVERLINE";
    Ideogram[Ideogram["STRESS_MARKING"] = 64] = "STRESS_MARKING";
    Ideogram[Ideogram["ATTRIBUTES_OFF"] = 65] = "ATTRIBUTES_OFF";
})(Ideogram || (Ideogram = {}));
export class Ansi {
    static construct(effects) {
        if (effects.length === 0)
            return "";
        return `\x1B[${effects.join(";")}m`;
    }
}
export class Terminal {
    _NEW_LINE_ITEM = `\n<br>\n`;
    _FIRST_LINE = true;
    columns;
    rows;
    _OUTPUT_POINT;
    _ANSI;
    constructor({ rows = 0, columns = 0, outputPointId = "rich-stdout-terminal", ansi = true } = {}) {
        this._OUTPUT_POINT = document.getElementById(outputPointId);
        this._ANSI = ansi;
        const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        this.rows = rows > 0 ? rows : Math.floor(this._OUTPUT_POINT.offsetHeight / remSize);
        this.columns = columns > 0 ? columns : Math.floor(this._OUTPUT_POINT.offsetWidth / (remSize / 2));
        this.setupGrid();
    }
    setupGrid() {
        let html = "";
        for (let i = 0; i < this.rows; i++) {
            html += `<div class="row">` + `<span class="cell"></span>`.repeat(this.columns) + `</div>`;
        }
        this._OUTPUT_POINT.innerHTML = html;
    }
    write(message) {
        console.log(message);
    }
    print({ text = "", effects = [], new_line = true, reset_style = true }) {
        let output = text;
        if (this._ANSI) {
            if (this._FIRST_LINE) {
                this._FIRST_LINE = false;
                new_line = false;
            }
            output = Ansi.construct(effects) + output;
            if (reset_style)
                output += Ansi.construct([Effect.RESET]);
        }
        if (new_line)
            this.write(this._NEW_LINE_ITEM);
        this.write(output);
    }
    error({ text, new_line = true }) {
        this._ANSI
            ? this.print({ text, effects: [Effect.BOLD, Colour.FOREGROUND_RED], new_line })
            : this.print({ text: `ERROR: ${text}`, new_line });
    }
    warning(text, new_line = true) {
        this._ANSI
            ? this.print({ text, effects: [Effect.BOLD, Colour.FOREGROUND_YELLOW], new_line })
            : this.print({ text: `WARNING: ${text}`, new_line });
    }
    table({ object, colour_pairings = {
        "string": [Colour.FOREGROUND_GREEN],
        "number": [Colour.FOREGROUND_BLUE],
        "boolean": [Colour.FOREGROUND_YELLOW],
        "object": [Colour.FOREGROUND_LIGHT_BLUE, Effect.FAINT],
    }, tab = "  ", indent = 0 }) {
        const formatData = (data, depth) => {
            const type = typeof data;
            let style = this._ANSI ? Ansi.construct(colour_pairings[type] || []) : "";
            let reset = this._ANSI ? Ansi.construct([Effect.RESET]) : "";
            if (data === null)
                return `${style}null${reset}`;
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
    clear() { if (this._ANSI)
        this.write(`\x1B[2J`); }
    move_cursor(x, y) { if (this._ANSI)
        this.write(`\x1B[${y};${x}H`); }
}
