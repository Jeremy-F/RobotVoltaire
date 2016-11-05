export class CordialError{
    public message : string;
    public alternative : string;
    public percent : number;
    public start : number;
    public end : number;

    constructor(message : string, alternative : string, percent : number, start : number, end : number){
        this.message = message;
        this.alternative = alternative;
        this.percent = percent;
        this.end = end;
        this.start = start;
    }

}