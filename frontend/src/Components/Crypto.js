import { createHash } from "crypto";


export default function sha256(string){
    return createHash('sha256').update(string).digest('hex');
}