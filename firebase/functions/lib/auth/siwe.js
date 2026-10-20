"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySiweAndLogin = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const siwe_1 = require("siwe");
/**
 * Verify SIWE Signature and issue custom Firebase Auth Token
 */
exports.verifySiweAndLogin = functions.https.onCall(async (data) => {
    const { message, signature } = data;
    if (!message || !signature) {
        throw new functions.https.HttpsError('invalid-argument', 'Message and signature required');
    }
    try {
        const siweMessage = new siwe_1.SiweMessage(message);
        const fields = await siweMessage.verify({ signature });
        if (!fields.success) {
            throw new functions.https.HttpsError('unauthenticated', 'Invalid cryptographic signature');
        }
        const walletAddress = siweMessage.address.toLowerCase();
        const uid = `eth:${walletAddress}`;
        // Query or create user record in Firestore
        const userRef = admin.firestore().collection('users').doc(uid);
        const userDoc = await userRef.get();
        let role = 'backer';
        if (!userDoc.exists) {
            await userRef.set({
                walletAddress,
                displayName: `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
                role: 'backer',
                kycStatus: 'not_started',
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });
        }
        else {
            role = userDoc.data()?.role || 'backer';
        }
        // Set custom claims
        await admin.auth().setCustomUserClaims(uid, {
            role,
            walletAddress,
        });
        // Create Firebase custom token
        const customToken = await admin.auth().createCustomToken(uid, {
            role,
            walletAddress,
        });
        return { token: customToken, uid, role };
    }
    catch (error) {
        functions.logger.error('SIWE verification error:', error);
        throw new functions.https.HttpsError('internal', error.message || 'Authentication failed');
    }
});
//# sourceMappingURL=siwe.js.map