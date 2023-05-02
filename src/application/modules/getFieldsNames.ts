import { Tables } from "./Types";

enum UsersFields {
    id = 'id',
    login = 'login',
    name = 'name',
    token = 'token'
}

export default function getFieldsName(table: Tables): string []{
    switch (table) {
        case Tables.users: return [
            UsersFields.id, 
            UsersFields.login, 
            UsersFields.name, 
            UsersFields.token]
        }
    return [];
}