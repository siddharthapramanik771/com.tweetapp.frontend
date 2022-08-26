import { objectId } from "./objectId";

export class Reply{
    constructor(
        public msg:string,
        public username:string,
        public _id:objectId,
        public tweet_id:string
    ){}
}