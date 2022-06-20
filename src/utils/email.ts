export interface IEmail{
    sendMail:(arg:any) => void
}

export default class EmailServices implements IEmail{
    private mailService:IEmail;

    constructor(mailService:IEmail){
        this.mailService = mailService
    }

    sendMail(arg:any):void{
        try{
            this.mailService.sendMail(arg)
        } catch(error) {
            throw error
        }
    }
    
}
