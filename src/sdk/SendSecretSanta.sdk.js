import { Remote } from "./remote.js"

export class SendSecretSanta {
    static remote = new Remote("https://vxscfo5m5blmcjqniyfdfw3uii0lwbyo.lambda-url.us-east-1.on.aws/")

    static async hello() {
        return SendSecretSanta.remote.call("SendSecretSanta.hello")  
    }
    
    
}

export { Remote };
