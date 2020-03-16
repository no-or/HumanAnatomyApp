const refreshTokenModel = require('../models/refreshTokens');

const uploadToken = async (refreshToken) => {
    let body = { refreshToken };
    let postBody = new refreshTokenModel(body);
    try {
        await postBody.save().then((item) =>  item);
        return true;
    } catch (e) {
        console.error(`could not save the token to DB for ${e}`);
        return false;
    }
};

const deleteToken = async (refreshToken) => {
    try {
        const token = await refreshTokenModel.findOneAndRemove({refreshToken});
        if (token === null || token.length === 0) {
            console.error(`${refreshToken} is not in the DB`);
            return false;
        } else {
            return true;
        }
    } catch (e) {
        console.error(`Could not remove the token ${refreshToken} for ${e.message}`);
        return false;
    }
};

const findToken = async (refreshToken) => {
    try {
        const token = await refreshTokenModel.findOne({refreshToken});
        return !(token === null || token.length === 0);
    } catch (e) {
        console.error(`Could not find the token ${refreshToken} for ${e.message}`);
        return false;
    }
};

exports.uploadToken = uploadToken;
exports.deleteToken = deleteToken;
exports.findToken = findToken;