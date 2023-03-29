"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useGetMessagesHandler(answer, mediator) {
    return (req, res) => {
        if (req.params.chatHash != mediator.get('GET_CHAT_HASH')) {
            const user = mediator.get('GET_USER_BY_TOKEN', req.params.token);
            if (user) {
                res.send(answer.good({
                    messages: mediator.get('GET_MESSAGES', user.id),
                    chatHash: mediator.get('GET_CHAT_HASH')
                }));
            }
        }
        else
            res.send(null);
    };
}
exports.default = useGetMessagesHandler;
