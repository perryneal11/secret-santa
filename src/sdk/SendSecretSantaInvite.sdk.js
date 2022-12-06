import { Remote } from "./remote.js"

export class SendSecretSantaInvite {
    static remote = new Remote("https://syaxvd23k6byp2gyj47ogi3i2a0tizrb.lambda-url.us-east-1.on.aws/")

    static async sendInvite(attendees) {
        return SendSecretSantaInvite.remote.call("SendSecretSantaInvite.sendInvite", attendees)  
    }

    
}

export { Remote };
