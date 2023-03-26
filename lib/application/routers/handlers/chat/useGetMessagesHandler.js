"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useGetMessagesHandler(answer, mediator) {
    return (req, res) => {
        const user = mediator.get('GET_USER_BY_TOKEN', req.params.token);
        if (user) {
            res.send(answer.good({
                messages: mediator.get('GET_MESSAGES', user),
                chatHash: mediator.get('GET_CHAT_HASH')
            }));
        }
    };
}
exports.default = useGetMessagesHandler;
