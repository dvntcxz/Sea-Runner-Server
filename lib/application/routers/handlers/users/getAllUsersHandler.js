"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logoutHandler(answer, mediator) {
    return (req, res) => {
        if (mediator.get('GET_USER_BY_TOKEN', req.params.token))
            res.send(answer.good(mediator.get('GET_ALL_USERS')));
    };
}
exports.default = logoutHandler;
