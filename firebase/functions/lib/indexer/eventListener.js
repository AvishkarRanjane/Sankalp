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
exports.syncMonadEvent = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
/**
 * On-chain event ingestion hook
 * Idempotently records contributions and milestone status into Firestore
 */
exports.syncMonadEvent = functions.https.onRequest(async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }
    const { eventType, txHash, logIndex, campaignAddress, backer, amountUSDC, milestoneIndex } = req.body;
    if (!eventType || !txHash) {
        res.status(400).send('Missing required transaction parameters');
        return;
    }
    const db = admin.firestore();
    const txRef = db.collection('contributions').doc(`${txHash}-${logIndex || 0}`);
    try {
        if (eventType === 'Contributed') {
            // Idempotent write
            await txRef.set({
                txHash,
                campaignAddress: campaignAddress.toLowerCase(),
                backerWallet: backer.toLowerCase(),
                amountUSDC: Number(amountUSDC),
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
            }, { merge: true });
            // Update project aggregate raised counter
            const projectQuery = await db.collection('projects')
                .where('contractAddress', '==', campaignAddress.toLowerCase())
                .limit(1)
                .get();
            if (!projectQuery.empty) {
                const projectDoc = projectQuery.docs[0];
                await projectDoc.ref.update({
                    raisedUSDC: admin.firestore.FieldValue.increment(Number(amountUSDC)),
                    backersCount: admin.firestore.FieldValue.increment(1),
                });
            }
        }
        else if (eventType === 'MilestoneReleased') {
            const projectQuery = await db.collection('projects')
                .where('contractAddress', '==', campaignAddress.toLowerCase())
                .limit(1)
                .get();
            if (!projectQuery.empty) {
                const projectDoc = projectQuery.docs[0];
                const msRef = projectDoc.ref.collection('milestones').doc(`ms_${milestoneIndex}`);
                await msRef.update({
                    status: 'released',
                    releasedAt: admin.firestore.FieldValue.serverTimestamp(),
                });
            }
        }
        res.status(200).json({ success: true });
    }
    catch (err) {
        functions.logger.error('Error syncing Monad event:', err);
        res.status(500).json({ error: err.message });
    }
});
//# sourceMappingURL=eventListener.js.map