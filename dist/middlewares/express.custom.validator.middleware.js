"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExpressValidatorCustom {
    static validateAddress(req, type) {
        const result = [
            req.body("address_1", "missing address_1").exists(),
            req.body("city", "Invalid email").exists().isEmail(),
            req.body("state").optional().isInt(),
            req.body("zipcode").optional().isIn(["enabled", "disabled"])
        ];
        return result;
    }
    static validatePhone(req, type) {
        const result = [
            req.body("address_1", "missing address_1").exists(),
            req.body("city", "Invalid email").exists().isEmail(),
            req.body("state").optional().isInt(),
            req.body("zipcode").optional().isIn(["enabled", "disabled"])
        ];
        return result;
    }
    static validateZipcode(req, type) {
        const result = [
            req.body("address_1", "missing address_1").exists(),
            req.body("city", "Invalid email").exists().isEmail(),
            req.body("state").optional().isInt(),
            req.body("zipcode").optional().isIn(["enabled", "disabled"])
        ];
        return result;
    }
}
exports.default = ExpressValidatorCustom;
//# sourceMappingURL=express.custom.validator.middleware.js.map