"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useSendMessage(answer, mediator) {
    return (req, res) => {
        const from = mediator.get('GET_USER_BY_TOKEN', req.params.token);
        const to = mediator.get('GET_USER', Number(req.params.to));
        res.send(true);
    };
}
exports.default = useSendMessage;
