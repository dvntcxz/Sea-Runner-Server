"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useRegistrationHandler(answer, mediator) {
    return (req, res) => {
        const { login, password, name } = req.params;
        res.send(answer.good(mediator.get('REGISTRATION', { login, password, name })));
    };
}
exports.default = useRegistrationHandler;
