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
var RoomFields;
(function (RoomFields) {
    RoomFields["id"] = "id";
    RoomFields["type"] = "type";
})(RoomFields || (RoomFields = {}));
var TownFields;
(function (TownFields) {
    TownFields["id"] = "id";
    TownFields["name"] = "name";
    TownFields["allianceId"] = "allianceid";
})(TownFields || (TownFields = {}));
function getFieldsName(table) {
    switch (table) {
        case Types_1.Tables.users: return [
            UsersFields.id,
            UsersFields.login,
            UsersFields.name,
            UsersFields.token
        ];
        case Types_1.Tables.rooms: return [
            RoomFields.id,
            RoomFields.type
        ];
        case Types_1.Tables.towns: return [
            TownFields.id,
            TownFields.name,
            TownFields.allianceId
        ];
    }
    return [];
}
exports.default = getFieldsName;
