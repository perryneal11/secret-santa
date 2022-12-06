import { Remote } from "./remote.js"

export class send {
    static remote = new Remote("https://sg7in6fr7ftlurgnexron6jbq40mgvmu.lambda-url.us-east-1.on.aws/")

    static async invite(initiator, location, date, limit, attendees) {
        return send.remote.call("send.invite", initiator, location, date, limit, attendees)  
    }

    
}

export { Remote };
