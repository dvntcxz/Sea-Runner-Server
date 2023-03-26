import { TCaptain } from "../Types";

export default class Captain{
    protected id;
    protected userId;
    private allianceId;
    private activeShipId;
    private posX;
    private posY;
    private direction;
    constructor(data: TCaptain){
        this.id = data.id;
        this.userId = data.userId;
        this.allianceId = data.allianceId;
        this.activeShipId = data.activeShipId;
        this.posX = data.posX;
        this.posY = data.posY;
        this.direction = data.direction;
    }
}