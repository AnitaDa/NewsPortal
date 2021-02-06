export class User {
    constructor(
        public email:string,
        public userName:string,
        public lozinkaHash:string,
        public lozinkaSalt:string,
        public administratorId:number
    ){}
}
