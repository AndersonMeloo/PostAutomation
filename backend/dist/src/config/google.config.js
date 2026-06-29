"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleOAuthConfig = getGoogleOAuthConfig;
function getGoogleOAuthConfig(configService) {
    const clientID = configService.get('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get('GOOGLE_CLIENT_SECRET');
    const callbackURL = configService.get('GOOGLE_CALLBACK_URL');
    if (!clientID || !clientSecret || !callbackURL) {
        throw new Error('Variaveis GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET e GOOGLE_CALLBACK_URL sao obrigatorias');
    }
    return {
        clientID,
        clientSecret,
        callbackURL,
    };
}
//# sourceMappingURL=google.config.js.map