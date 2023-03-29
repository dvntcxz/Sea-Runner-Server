///////////////////////////
////////Users//////////////
///////////////////////////

export type TUser = {
    id: number;
    login: string;
    password: string;
    name: string;
    token: string | null;

};

export type TUsers = TUser[];

export type TUserRegistrationData = {
    login: string;
    password: string;
    name: string;
}

export type TUserSignInData = {
    login: string;
    password: string;
}


///////////////////////////
////////Game///////////////
///////////////////////////

export type TCaptain = {
    id: number;
    userId: number;
    allianceId: string;
    activeShipId: number;
    posX: number;
    posY: number;
    direction: number;
}

export type TShip = {
    id: number;
    captainId: number;
    currentHp: number;
    maxHp: number;
    speed: number;
    attackSpeed: number;
    countCannon: number;
    grade: number;
    sizeInventory: number
}

export type TEffectCell = {
    id: number;
    shipId: number;
    effectId: number;
}

export type TInventoryCell = {
    id: number;
    shipId: number;
    invetoryNumber: number;
    itemId: number;
}

export type TItem = {
    id: number;
    typeId: number;
    name: number;
    grade: number;
}

///////////////////////////
////////Messages///////////
///////////////////////////

export type TMessage = {
    id: number;
    userIdFrom: number;
    userIdTo: number | null;
    message: string;
}

export type TMessages = TMessage[];

export type TNewMessage = {
    userIdFrom: number;
    userIdTo: number | null;
    message: string;
}
