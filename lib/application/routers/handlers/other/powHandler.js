"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function powHandler(req, res) {
    const value = Number(req.params.value);
    const pow = Number(req.params.pow);
    res.send(Math.pow(value, pow).toString());
}
exports.default = powHandler;
