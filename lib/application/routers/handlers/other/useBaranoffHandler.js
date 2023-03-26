"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useBaranoffHandler(answer) {
    return (req, res) => {
        res.send(`Студенты ${Object.values(req.query).join(', ')} получают пять`);
    };
}
exports.default = useBaranoffHandler;
