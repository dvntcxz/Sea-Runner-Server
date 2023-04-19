///////////////////////////
////////Users//////////////

import { Socket } from "socket.io";
import User from "./UserManager/User";

///////////////////////////
export interface ILogin {
    login: string;
    password: string;
};

export interface IUserData extends ILogin{
    name: string;
}

export interface IUser extends IUserData{
    id: number;
    token: string;
}

export type TUsers = IUser[];

///////////////////////////
////////GAME///////////////
///////////////////////////


///////////////////////////
////////CAPTAIN////////////
///////////////////////////
export type TCaptainData = {
    activeShipId?: number | null;
    posX?: number;
    posY?: number;
    direction?: number;
}

export interface ICaptainData{
    userId: number;
    allianceId: number;
    activeShipId: number | null;
    posX: number;
    posY: number;
    direction: number;
}

export interface ICaptain extends ICaptainData{
    id: number;
}

export type TCaptains = ICaptain [];

///////////////////////////
////////SHIP///////////////
///////////////////////////

export interface IShipData {
    captainId: number;
    currentHp: number;
    speed: number;
    attackSpeed: number;
    countCannon: number | null;
    grade: number;
    sizeInventory: number;
}

export interface IShip extends IShipData {
    id: number;
}

export type TShips = IShip[];

export type TEffectCell = {
    id: number;
    shipId: number;
    effectId: number;
}

export type TInventoryCell = {
    id: number;
    shipId: number;
    cellNumber: number;
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

export interface IMessageData  {
    userIdFrom: number;
    userIdTo: number | null;
    message: string;
}

export interface IMessage extends IMessageData {
    id: number;
}

export type TMessages = IMessage[];

export interface IUserSocket extends Socket {
    user: User | null;
}

export type TRoom = {
    guid: string;
    type: string;
}

