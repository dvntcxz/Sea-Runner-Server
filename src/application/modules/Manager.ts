import Mediator from "./Mediator";

export default class Manager{
    protected mediator:Mediator;
    protected EVENTS;
    protected TRIGGERS;
    constructor(options:{mediator: Mediator}){
        this.mediator = options.mediator;
        this.EVENTS = this.mediator.getEventsNames();
        this.TRIGGERS = this.mediator.getTriggersNames();
    }
}