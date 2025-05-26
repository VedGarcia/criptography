import * as crypto from "crypto";

type PRNG = "byte" | "int" | "uuid";

const prng = (type: PRNG, size: number, min: number, max: number, encoding: BufferEncoding) => {
    switch (type) {
        case "byte":
            return crypto.randomBytes(size).toString(encoding);
        case "int":
            return crypto.randomInt(min, max);
        case "uuid":
            return crypto.randomUUID();
    }
}


export default prng