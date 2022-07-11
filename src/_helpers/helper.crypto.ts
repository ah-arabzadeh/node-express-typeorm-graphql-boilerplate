import * as bcrypt from "bcrypt";

export class HelperCrypto {

    /**
     * Get a plain text and make hash string
     * @param plainString
     * @param algorithm (default is "bcrypt")
     * @return a hash string
     */
    public static async makeHashString(plainString: string, algorithm = "bcrypt"): Promise<string> {
        switch (algorithm) {
            case "bcrypt": {
                return bcrypt.hash(plainString, 10)
                    .then(h => {
                        return h;
                    }).catch(err => {
                        return err;
                    });
            }
            default: { // unknown algorithm
                throw new Error(`The "${algorithm}" algorithm is unknown!`);
            }
        }
    }

    /**
     * Get a plainText and a hashedString and compare them
     * @param plainString 
     * @param hashedString
     * @param algorithm  (default is "bcrypt")
     * @returns true | false
     */
    public static async verifyHashedString(plainString: string, hashedString: string, algorithm = "bcrypt"): Promise<boolean> {
        switch (algorithm) {
            case "bcrypt": {
                return bcrypt.compare(plainString, hashedString)
                    .then(b => {
                        return b;
                    }).catch(err => {
                        return err;
                    });
            }
            default: { // unknown algorithm
                throw new Error(`The "${algorithm}" algorithm is unknown!`);
            }
        }
    }
}