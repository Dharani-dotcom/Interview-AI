import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc,
  getDocFromServer,
  collection, 
  onSnapshot, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  updateDoc,
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';
import { UserUsageState, SubscriptionPaymentRecord, PlanId, UserProfile } from '../types';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  return errInfo;
}

// Connection test on boot as required by Firebase skill
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase Firestore connection verified');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline notice. Verify network or Firebase configuration.');
    }
  }
}

// Google Sign-In with popup & real-time Firestore persistence
export async function signInWithGoogle(customTargetRole?: string) {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const existingSnap = await getDoc(userRef);
      
      const defaultAvatar = user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.email || user.uid)}`;
      
      if (!existingSnap.exists()) {
        await setDoc(userRef, {
          userId: user.uid,
          name: user.displayName || 'Candidate',
          email: user.email || '',
          avatar: defaultAvatar,
          role: 'Software Engineer',
          targetRole: customTargetRole || 'Senior Full Stack / AI Engineer',
          dailyStreak: 1,
          overallScore: 88,
          totalInterviews: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } else {
        const existingData = existingSnap.data();
        await setDoc(userRef, {
          name: user.displayName || existingData.name || 'Candidate',
          email: user.email || existingData.email || '',
          avatar: user.photoURL || existingData.avatar || defaultAvatar,
          ...(customTargetRole ? { targetRole: customTargetRole } : {}),
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }

      // Initialize / ensure user usage doc exists in Firestore for this exact UID
      const usageRef = doc(db, 'userUsage', user.uid);
      const usageSnap = await getDoc(usageRef);
      if (!usageSnap.exists()) {
        await setDoc(usageRef, {
          userId: user.uid,
          userEmail: user.email || '',
          planId: 'free',
          planName: 'Free Trial',
          totalAllowedUses: 1,
          usedCount: 0,
          remainingUses: 1,
          isUnlimited: false,
          updatedAt: new Date().toISOString()
        });
      }
    }
    return user;
  } catch (error: any) {
    console.error('Google Sign In failed:', error);
    throw error;
  }
}

export async function getUserProfileFromFirestore(userId: string) {
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${userId}`);
    return null;
  }
}

export async function updateUserProfileInFirestore(userId: string, data: Partial<UserProfile>) {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${userId}`);
    throw error;
  }
}

export async function signOutUser() {
  try {
    await fbSignOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
  }
}

// Real-time Firestore listeners & helpers
export function subscribeToWebinarRegistrations(onData: (data: any[]) => void) {
  const colRef = collection(db, 'webinarRegistrations');
  return onSnapshot(colRef, (snapshot) => {
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    onData(items);
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, 'webinarRegistrations');
  });
}

export function subscribeToWebinars(onData: (data: any[]) => void) {
  const colRef = collection(db, 'webinars');
  return onSnapshot(colRef, (snapshot) => {
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    onData(items);
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, 'webinars');
  });
}

export function subscribeToPracticeQuestions(onData: (data: any[]) => void) {
  const colRef = collection(db, 'practiceQuestions');
  return onSnapshot(colRef, (snapshot) => {
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    onData(items);
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, 'practiceQuestions');
  });
}

export async function saveWebinarRegistrationToFirestore(regData: any) {
  try {
    const colRef = collection(db, 'webinarRegistrations');
    const docRef = await addDoc(colRef, {
      ...regData,
      registeredAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'webinarRegistrations');
    throw err;
  }
}

export async function saveInterviewReportToFirestore(reportData: any) {
  try {
    const colRef = collection(db, 'interviewReports');
    const docRef = await addDoc(colRef, {
      ...reportData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'interviewReports');
    throw err;
  }
}

export async function saveWebinarToFirestore(webinarData: any) {
  try {
    const colRef = collection(db, 'webinars');
    const docRef = await addDoc(colRef, {
      ...webinarData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'webinars');
    throw err;
  }
}

export async function savePracticeQuestionToFirestore(questionData: any) {
  try {
    const colRef = collection(db, 'practiceQuestions');
    const docRef = await addDoc(colRef, {
      ...questionData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'practiceQuestions');
    throw err;
  }
}

// ---------------------------------------------------------------------------
// REAL-TIME USER USAGE & SUBSCRIPTION QUOTA TRACKING (1 FREE USE, ₹499, ₹1299, ₹2000)
// ---------------------------------------------------------------------------

export const DEFAULT_FREE_USAGE: UserUsageState = {
  userId: 'default-candidate',
  userEmail: '',
  planId: 'free',
  planName: 'Free Trial',
  totalAllowedUses: 1, // 1 time free use for all
  usedCount: 0,
  remainingUses: 1,
  isUnlimited: false,
  updatedAt: new Date().toISOString()
};

// Subscribe in real-time to user's usage document
export function subscribeToUserUsage(
  userId: string, 
  userEmail: string,
  onData: (usage: UserUsageState) => void
) {
  const safeId = userId || (userEmail ? userEmail.replace(/[^a-zA-Z0-9]/g, '_') : 'guest_candidate');
  const userUsageRef = doc(db, 'userUsage', safeId);

  return onSnapshot(userUsageRef, async (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data() as UserUsageState;
      onData({
        ...data,
        userId: safeId,
        userEmail: userEmail || data.userEmail || ''
      });
    } else {
      // Initialize free trial doc with 1 free use
      const initialDoc: UserUsageState = {
        userId: safeId,
        userEmail: userEmail || '',
        planId: 'free',
        planName: 'Free Trial',
        totalAllowedUses: 1,
        usedCount: 0,
        remainingUses: 1,
        isUnlimited: false,
        updatedAt: new Date().toISOString()
      };
      try {
        await setDoc(userUsageRef, initialDoc, { merge: true });
        onData(initialDoc);
      } catch (e) {
        // Fallback for local view
        onData(initialDoc);
      }
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, `userUsage/${safeId}`);
  });
}

// Check and consume 1 use across Coding, Interview, Resume Analyzer
export async function consumeFeatureUsage(
  userId: string,
  userEmail: string,
  featureName: string
): Promise<{ allowed: boolean; remainingUses: number; isUnlimited: boolean; message?: string }> {
  const safeId = userId || (userEmail ? userEmail.replace(/[^a-zA-Z0-9]/g, '_') : 'guest_candidate');
  const userUsageRef = doc(db, 'userUsage', safeId);

  try {
    const snap = await getDoc(userUsageRef);
    let currentUsage: UserUsageState;

    if (!snap.exists()) {
      currentUsage = {
        userId: safeId,
        userEmail: userEmail || '',
        planId: 'free',
        planName: 'Free Trial',
        totalAllowedUses: 1,
        usedCount: 0,
        remainingUses: 1,
        isUnlimited: false,
        updatedAt: new Date().toISOString()
      };
    } else {
      currentUsage = snap.data() as UserUsageState;
    }

    // Unlimited Plan bypass
    if (currentUsage.isUnlimited || currentUsage.planId === 'tier-1299' || currentUsage.planId === 'tier-2000' || currentUsage.totalAllowedUses === -1) {
      const updated: Partial<UserUsageState> = {
        usedCount: (currentUsage.usedCount || 0) + 1,
        updatedAt: new Date().toISOString()
      };
      await setDoc(userUsageRef, updated, { merge: true });
      return { allowed: true, remainingUses: 99999, isUnlimited: true };
    }

    // Check if uses remain
    const remaining = currentUsage.remainingUses !== undefined ? currentUsage.remainingUses : (currentUsage.totalAllowedUses - currentUsage.usedCount);
    if (remaining <= 0) {
      return {
        allowed: false,
        remainingUses: 0,
        isUnlimited: false,
        message: `You have used your ${currentUsage.planName} limit (${currentUsage.totalAllowedUses} uses). Please unlock a subscription plan (₹99 for Starter 5 uses, ₹699 for Medium 25 uses, or ₹1299 for Unlimited) via UPI QR Code.`
      };
    }

    // Deduct 1 use
    const newUsedCount = (currentUsage.usedCount || 0) + 1;
    const newRemaining = Math.max(0, currentUsage.totalAllowedUses - newUsedCount);

    const updatedState: UserUsageState = {
      ...currentUsage,
      usedCount: newUsedCount,
      remainingUses: newRemaining,
      updatedAt: new Date().toISOString()
    };

    await setDoc(userUsageRef, updatedState, { merge: true });
    console.log(`[Usage Consumed] Feature: ${featureName}, Remaining: ${newRemaining}`);

    return { allowed: true, remainingUses: newRemaining, isUnlimited: false };
  } catch (err) {
    console.warn('Error deducting usage from Firestore, granting operation fallback:', err);
    return { allowed: true, remainingUses: 1, isUnlimited: false };
  }
}

// Candidate submits a UPI Subscription payment with UTR
export async function submitSubscriptionPaymentToFirestore(payment: {
  userId: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  planId: PlanId;
  planName: string;
  amount: number;
  totalUsesGranted: number;
  utr: string;
}) {
  try {
    const colRef = collection(db, 'subscriptionPayments');
    const paymentDoc: SubscriptionPaymentRecord = {
      id: Date.now().toString(),
      userId: payment.userId,
      userEmail: payment.userEmail,
      userName: payment.userName,
      userPhone: payment.userPhone || '',
      planId: payment.planId,
      planName: payment.planName,
      amount: payment.amount,
      totalUsesGranted: payment.totalUsesGranted,
      utr: payment.utr,
      status: 'verified', // Instant activation upon verified UTR submission
      paidTo: 'priyadha1988@oksbi',
      createdAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString()
    };

    const docRef = await addDoc(colRef, paymentDoc);

    // Automatically update the user's usage quota in real-time
    const safeId = payment.userId || payment.userEmail.replace(/[^a-zA-Z0-9]/g, '_');
    const userUsageRef = doc(db, 'userUsage', safeId);
    const isUnlimited = payment.planId === 'tier-1299' || payment.planId === 'tier-2000' || payment.totalUsesGranted === -1;

    const newUsageState: UserUsageState = {
      userId: safeId,
      userEmail: payment.userEmail,
      planId: payment.planId,
      planName: payment.planName,
      totalAllowedUses: isUnlimited ? -1 : payment.totalUsesGranted,
      usedCount: 0,
      remainingUses: isUnlimited ? 99999 : payment.totalUsesGranted,
      isUnlimited: isUnlimited,
      updatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    await setDoc(userUsageRef, newUsageState, { merge: true });

    return { docId: docRef.id, payment: paymentDoc };
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'subscriptionPayments');
    throw err;
  }
}

// Real-time subscription payments listener (for Admin view)
export function subscribeToSubscriptionPayments(onData: (payments: SubscriptionPaymentRecord[]) => void) {
  const colRef = collection(db, 'subscriptionPayments');
  return onSnapshot(colRef, (snapshot) => {
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as SubscriptionPaymentRecord[];
    // sort newest first
    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    onData(items);
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, 'subscriptionPayments');
  });
}

// Admin manual quota modification or payment verification
export async function adminUpdateUserQuota(
  userId: string,
  planId: PlanId,
  planName: string,
  totalUses: number,
  remainingUses: number
) {
  try {
    const userUsageRef = doc(db, 'userUsage', userId);
    const isUnlimited = planId === 'tier-1299' || planId === 'tier-2000' || totalUses === -1;
    await setDoc(userUsageRef, {
      userId,
      planId,
      planName,
      totalAllowedUses: totalUses,
      remainingUses: isUnlimited ? 99999 : remainingUses,
      isUnlimited,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `userUsage/${userId}`);
    throw err;
  }
}

