import { Tables } from "./Types";

enum UsersFields {
    id = 'id',
    login = 'login',
    name = 'name',
    token = 'token'
}

enum RoomFields {
    id = 'id',
    type = 'type'
}

enum TownFields {
    id = 'id',
    name = 'name',
    allianceId = 'allianceid'
}

export default function getFieldsName(table: Tables): string []{
    switch (table) {
        case Tables.users: return [
            UsersFields.id, 
            UsersFields.login, 
            UsersFields.name, 
            UsersFields.token]
        case Tables.rooms: return [
            RoomFields.id,
            RoomFields.type
        ]
        case Tables.towns: return [
            TownFields.id,
            TownFields.name,
            TownFields.allianceId
        ]
        }
    return [];
}