
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

export function getValidInputRequest(request: any) {
    Object.assign(request, validRequest);
    return request;
}

export function getInvalidInputRequest(request: any, errorParams: any) {
    // Get de default valid request
    Object.assign(request, validRequest);

    // Override the validationErrors function with desired errors
    request.validationErrors = function () {
        const errors: any = [];
        errorParams.forEach(function (error: any) {
            errors.push({ msg: 'the parameter "' + error + '" is mandatory' });
        });
        return errors;
    };

    return request;
}