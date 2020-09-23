"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validRequest = {
    // Default validations used
    assert: function () { return this; },
    checkHeaders: function () { return this; },
    checkBody: function () { return this; },
    checkQuery: function () { return this; },
    notEmpty: function () { return this; },
    // Custom validations used
    isHash: function () { return this; },
    isArray: function () { return this; },
    gte: function () { return this; },
    // Validation errors
    validationErrors: function () { return false; }
};
function getValidInputRequest(request) {
    Object.assign(request, validRequest);
    return request;
}
exports.getValidInputRequest = getValidInputRequest;
function getInvalidInputRequest(request, errorParams) {
    // Get de default valid request
    Object.assign(request, validRequest);
    // Override the validationErrors function with desired errors
    request.validationErrors = function () {
        const errors = [];
        errorParams.forEach(function (error) {
            errors.push({ msg: 'the parameter "' + error + '" is mandatory' });
        });
        return errors;
    };
    return request;
}
exports.getInvalidInputRequest = getInvalidInputRequest;
//# sourceMappingURL=express.validator.test.helper.js.map