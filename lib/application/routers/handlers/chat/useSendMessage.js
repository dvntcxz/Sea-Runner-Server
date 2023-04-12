"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useSendMessage(answer, mediator) {
    return (req, res) => {
        const { token, userIdTo, message } = req.params;
        const from = mediator.get('GET_USER_BY_TOKEN', token);
        if (from) {
            mediator.get('ADD_MESSAGE', {
                userIdFrom: from.id,
                userIdTo: (userIdTo != 'null') ? userIdTo : null,
                message: message
            });
            res.send(true);
        }
        else
            res.send(false);
    };
}
exports.default = useSendMessage;
