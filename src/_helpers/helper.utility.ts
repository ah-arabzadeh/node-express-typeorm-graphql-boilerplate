export class HelperUtility {
    /**
    * Make delay
    * @param ms Time as millisecond
    * @returns void
    */
    public static async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get a variable and check it is empty or not
     * @param {String | Number | Object} value
     * @returns {Boolean} true & false
     */
    public static isEmpty(value: string | number | object): boolean {
        if (value === null) {
            return true;
        } else if (typeof value !== "number" && value === "") {
            return true;
        } else if (typeof value === "undefined" || value === undefined) {
            return true;
        } else if (value !== null && typeof value === "object" && !Object.keys(value).length) {
            return true;
        } else {
            return false;
        }
    }
}