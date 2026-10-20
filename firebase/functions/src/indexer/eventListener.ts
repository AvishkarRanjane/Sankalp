import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**
 * On-chain event ingestion hook
 * Idempotently records contributions and milestone status into Firestore
 */
export const syncMonadEvent = functions.https.onRequest(async (req: any, res: any) => {
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
    } else if (eventType === 'MilestoneReleased') {
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
  } catch (err: any) {
    functions.logger.error('Error syncing Monad event:', err);
    res.status(500).json({ error: err.message });
  }
});
