"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Answer {
    constructor() {
        this.CODES = {
            404: 'Page not found',
            9000: 'Unknown error'
        };
    }
    good(data) {
        return {
            result: 'ok',
            data
        };
    }
    bad(code) {
        const errCode = (code || this.CODES[code]) ? code : 9000;
        return {
            result: 'error',
            data: {
                code: code,
                text: this.CODES[errCode]
            }
        };
    }
}
exports.default = Answer;
