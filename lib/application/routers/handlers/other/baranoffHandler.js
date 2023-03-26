"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baranoffHandler(req, res) {
    res.send(`Студенты ${Object.values(req.query).join(', ')} получают пять`);
}
exports.default = baranoffHandler;
