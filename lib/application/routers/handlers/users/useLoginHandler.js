"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useLoginHandler(answer, mediator) {
    return (req, res) => {
        const { login, password } = req.params;
        res.send(answer.good(mediator.get('LOG_IN', { login, password })));
    };
}
exports.default = useLoginHandler;
