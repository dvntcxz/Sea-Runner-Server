import Mediator from "./Mediator";
import DB from "./DB/DB";

export interface IManager{
    mediator: Mediator;
    db: DB;
}

export default class Manager{
    protected mediator:Mediator;
    protected EVENTS;
    protected TRIGGERS;
    protected db;
    constructor(options:{mediator: Mediator, db: DB}){
        this.mediator = options.mediator;
        this.db = options.db;
        this.EVENTS = this.mediator.getEventsNames();
        this.TRIGGERS = this.mediator.getTriggersNames();
    }
}