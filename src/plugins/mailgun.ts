import { IEmail } from './../utils/email';
import mailGun from 'mailgun-js';
import {config} from 'dotenv'

config()


const apiKey = process.env.MAIL_API_KEY || " ";
const domain = process.env.DOMAIN || " ";

export default class MailGun implements IEmail{
    private mailGun:any;
    private sender:string;

    constructor(){
        this.mailGun = mailGun({ 
            apiKey, 
            domain
        });
        this.sender = process.env.EMAIL_SENDER || " ";
    }

    sendMail({to , subject , text}:{to:string , subject:string , text:string}){
        try {
            const data = {
                from: this.sender,
                to,
                subject ,
                text
            };
        
            this.mailGun.messages().send(data, function (error:any, body:any) {
                if(error) {
                    console.log(error)
                    throw {
                        code: 500,
                        message: error,
                    };
                }
            });
        } catch (error) {
            throw error
        }
        
    }
    
}
