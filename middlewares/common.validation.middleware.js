const requiredProperty = (property, req, res) => {
    if (!req.body[property]) {
        res.error = new Error(`${property} property is missed or empty but it's required`);
    }
}

const propertyShouldNotBePresent = (property, body, res) => {
    // property should not be present
    if (property in body) {
        res.error = new Error(`${property} is not allowed to be passed`);
    }
}

const atLeastOneOfModeledPropertyExists = (body, user, res) => {
    const isAtLeastOnePropertyFromModelExists = Object.keys(body)
        .filter(key => key !== "id")
        .some(property => {
            return user.hasOwnProperty(property);
        });

    if (!isAtLeastOnePropertyFromModelExists) {
        res.error = new Error('at least one of the property from model should be pressent');
    }
}

const notAllowedPropertiesShouldNotBePresent = (body, model, res) => {
    // extra properties not from model are not allowed
    const isSuitsToModel = Object.keys(body)
        .filter(key => key !== "id")
        .every(property => {
            return model.hasOwnProperty(property);
        });

    if (!isSuitsToModel) {
        res.error = new Error('extra property not from model is not allowed');
    }
}

exports.requiredProperty = requiredProperty;
exports.atLeastOneOfModeledPropertyExists = atLeastOneOfModeledPropertyExists;
exports.propertyShouldNotBePresent = propertyShouldNotBePresent;
exports.notAllowedPropertiesShouldNotBePresent = notAllowedPropertiesShouldNotBePresent;