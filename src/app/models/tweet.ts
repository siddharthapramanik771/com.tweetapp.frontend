import { objectId } from "./objectId";

export class Tweet{
    constructor(
        public getId:string,
        public msg:string,
        public username:string,
        public likes:number,
        public users_liked:string[],
        public _id:objectId
    ){}
}
export class Msg{
    constructor(
        public msg:string
    ){}    
}