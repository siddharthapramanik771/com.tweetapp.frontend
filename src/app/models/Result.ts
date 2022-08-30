export class Result{
    constructor(
        public msg:string,
        public status:boolean,
        public data:object=new Object()
    ){}    
}