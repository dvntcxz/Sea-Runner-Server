"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("./Types");
var UsersFields;
(function (UsersFields) {
    UsersFields["id"] = "id";
    UsersFields["login"] = "login";
    UsersFields["name"] = "name";
    UsersFields["token"] = "token";
})(UsersFields || (UsersFields = {}));
function getFieldsName(table) {
    switch (table) {
        case Types_1.Tables.users: return [
            UsersFields.id,
            UsersFields.login,
            UsersFields.name,
            UsersFields.token
        ];
    }
    return [];
}
exports.default = getFieldsName;
