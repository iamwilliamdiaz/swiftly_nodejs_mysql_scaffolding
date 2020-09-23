"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randomGenerator;
(function (randomGenerator) {
    function getUniqueCode(_lenght) {
        try {
            const chars = "0123456789".split("");
            let result = "";
            for (let i = 0; i < _lenght; i++) {
                const x = Math.floor(Math.random() * chars.length);
                result += chars[x];
            }
            return result;
        }
        catch (_error) {
            return "error";
        }
    }
    randomGenerator.getUniqueCode = getUniqueCode;
})(randomGenerator = exports.randomGenerator || (exports.randomGenerator = {}));
//# sourceMappingURL=ramdom.generator.util.js.map