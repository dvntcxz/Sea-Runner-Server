"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useLogoutHandler(answer, mediator) {
    return (req, res) => {
        const token = req.params.token;
        mediator.get('lOG_OUT', token);
        res.send();
    };
}
exports.default = useLogoutHandler;
