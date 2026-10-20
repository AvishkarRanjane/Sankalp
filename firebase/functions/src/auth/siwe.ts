import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { SiweMessage } from 'siwe';

interface SiweAuthData {
  message?: string;
  signature?: string;
}

/**
 * Verify SIWE Signature and issue custom Firebase Auth Token
 */
export const verifySiweAndLogin = functions.https.onCall(async (data: SiweAuthData) => {
  const { message, signature } = data;

  if (!message || !signature) {
    throw new functions.https.HttpsError('invalid-argument', 'Message and signature required');
  }

  try {
    const siweMessage = new SiweMessage(message);
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
    } else {
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
  } catch (error: any) {
    functions.logger.error('SIWE verification error:', error);
    throw new functions.https.HttpsError('internal', error.message || 'Authentication failed');
  }
});
