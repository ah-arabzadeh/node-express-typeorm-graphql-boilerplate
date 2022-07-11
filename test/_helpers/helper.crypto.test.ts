import { HelperCrypto } from "../../src/_helpers";


describe("HelperCrypto", () => {
    test("Check verify function with correct input", async () => {
        expect(await HelperCrypto.verifyHashedString("abcdef", "$2a$10$Bq5yFESw6xCOKifZlPBwS.kVKJ6S/Lkd/p0wD.92zYDXRV3Xyw2W6")).toEqual(true);
    });
});