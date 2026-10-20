import * as admin from 'firebase-admin';

admin.initializeApp();

export { verifySiweAndLogin } from './auth/siwe';
export { syncMonadEvent } from './indexer/eventListener';
