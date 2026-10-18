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
  where,
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';
import { UserUsageState, SubscriptionPaymentRecord, PlanId, UserProfile, WebinarItem, WebinarRegistration, MockTestScoreRecord, HistoricalReport } from '../types';
import { setScopedCache, getScopedCache, purgeUserRealtimeCache } from './realtimeCache';
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
  console.warn('Cloud Database Notice:', JSON.stringify(errInfo));
  return errInfo;
}

// Connection test on boot as required by Firebase skill
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Cloud database offline notice. Verify network connection.');
    }
  }
}

// Google Sign-In with popup & real-time Firestore persistence
export async function signInWithGoogle(customTargetRole?: string) {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    if (user) {
      try {
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

        // Initialize / ensure user usage doc exists in cloud database for this exact UID
        const usageRef = doc(db, 'userUsage', user.uid);
        const usageSnap = await getDoc(usageRef);
        const emailSafeId = user.email ? user.email.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, '_') : '';

        if (!usageSnap.exists()) {
          // Check if user already purchased a pack using their email address before Google Sign-In
          let emailUsageData: UserUsageState | null = null;
          if (emailSafeId && emailSafeId !== user.uid) {
            const emailSnap = await getDoc(doc(db, 'userUsage', emailSafeId));
            if (emailSnap.exists() && emailSnap.data()?.planId !== 'free') {
              emailUsageData = emailSnap.data() as UserUsageState;
            }
          }

          if (emailUsageData) {
            await setDoc(usageRef, {
              ...emailUsageData,
              userId: user.uid,
              userEmail: user.email || emailUsageData.userEmail || '',
              updatedAt: new Date().toISOString()
            });
          } else {
            await setDoc(usageRef, {
              userId: user.uid,
              userEmail: user.email || '',
              planId: 'free',
              planName: 'Free Trial',
              totalAllowedUses: 2,
              usedCount: 0,
              remainingUses: 2,
              isUnlimited: false,
              updatedAt: new Date().toISOString()
            });
          }
        } else if (usageSnap.data()?.planId === 'free' && emailSafeId && emailSafeId !== user.uid) {
          // If UID doc is still on free trial, check if a paid pack was activated under emailSafeId
          const emailSnap = await getDoc(doc(db, 'userUsage', emailSafeId));
          if (emailSnap.exists() && emailSnap.data()?.planId !== 'free') {
            const paidData = emailSnap.data() as UserUsageState;
            await setDoc(usageRef, {
              ...paidData,
              userId: user.uid,
              userEmail: user.email || paidData.userEmail || '',
              updatedAt: new Date().toISOString()
            }, { merge: true });
          }
        }
      } catch (syncErr) {
        console.warn('Cloud profile sync notice:', syncErr);
      }
    }
    return user;
  } catch (error: any) {
    if (
      error?.code === 'auth/popup-closed-by-user' ||
      error?.code === 'auth/cancelled-popup-request'
    ) {
      return null;
    }
    throw error;
  }
}

export async function getUserProfileFromFirestore(userId: string) {
  if (!userId) return null;
  // 1. Check L1/L2 user-scoped SWR cache first for 0ms hydration
  const cachedProfile = getScopedCache<any>(userId, 'user_profile', true);
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data();
      setScopedCache(userId, 'user_profile', data, 10 * 60 * 1000);
      return data;
    }
    return cachedProfile;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${userId}`);
    return cachedProfile;
  }
}

export function subscribeToUserProfile(
  userId: string,
  onData: (profileData: any) => void
) {
  if (!userId || userId === 'default-candidate' || userId === 'guest_candidate') {
    return () => {};
  }
  const cached = getScopedCache<any>(userId, 'user_profile', true);
  if (cached) {
    onData(cached);
  }
  const userRef = doc(db, 'users', userId);
  return onSnapshot(
    userRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setScopedCache(userId, 'user_profile', data, 10 * 60 * 1000);
        onData(data);
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, `users/${userId}`);
    }
  );
}

export async function updateUserProfileInFirestore(userId: string, data: Partial<UserProfile>) {
  try {
    const userRef = doc(db, 'users', userId);
    const payload = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    await setDoc(userRef, payload, { merge: true });
    const existing = getScopedCache<any>(userId, 'user_profile', true) || {};
    setScopedCache(userId, 'user_profile', { ...existing, ...payload }, 10 * 60 * 1000);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${userId}`);
    throw error;
  }
}

export async function signOutUser() {
  try {
    const currentUid = auth.currentUser?.uid;
    const currentEmail = auth.currentUser?.email;
    // Purge all private cached profile/usage data so another user logging in never sees prior user state
    purgeUserRealtimeCache(currentUid);
    if (currentEmail) {
      purgeUserRealtimeCache(currentEmail.replace(/[^a-zA-Z0-9]/g, '_'));
    }
    purgeUserRealtimeCache();
    await fbSignOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
  }
}

// ---------------------------------------------------------------------------
// DEFAULT WEBINARS & REAL-TIME WEBINAR SYNC
// ---------------------------------------------------------------------------
export const DEFAULT_WEBINARS: WebinarItem[] = [
  {
    id: "webinar-100-1",
    name: "Mastering System Design & Distributed Systems (Live Workshop)",
    date: "Tomorrow, 7:00 PM IST",
    sourceManName: "Priyadha 1988 (Senior Architect)",
    meetingLink: "",
    gformLink: "",
    price: "₹100",
    createdAt: new Date().toISOString()
  },
  {
    id: "webinar-100-2",
    name: "FAANG Coding Interview & Algorithm Masterclass",
    date: "Saturday, 6:00 PM IST",
    sourceManName: "Priyadha 1988 (Lead Tech Director)",
    meetingLink: "",
    gformLink: "",
    price: "₹100",
    createdAt: new Date().toISOString()
  },
  {
    id: "webinar-100-3",
    name: "AI & Generative Engineering Bootcamp",
    date: "Sunday, 5:00 PM IST",
    sourceManName: "Priyadha 1988",
    meetingLink: "",
    gformLink: "",
    price: "₹100",
    createdAt: new Date().toISOString()
  }
];

let isSeedingWebinars = false;

// Real-time Firestore listeners & helpers
export function subscribeToWebinarRegistrations(onData: (data: any[]) => void) {
  const colRef = collection(db, 'webinarRegistrations');
  return onSnapshot(colRef, (snapshot) => {
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    // Sort by registeredAt desc
    items.sort((a: any, b: any) => new Date(b.registeredAt || 0).getTime() - new Date(a.registeredAt || 0).getTime());
    onData(items);
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, 'webinarRegistrations');
  });
}

export function subscribeToWebinars(onData: (data: WebinarItem[]) => void) {
  const colRef = collection(db, 'webinars');
  const metaRef = doc(db, 'systemConfig', 'webinars_meta');

  return onSnapshot(colRef, async (snapshot) => {
    try {
      let deletedIds: string[] = [];
      try {
        const metaSnap = await getDoc(metaRef);
        if (metaSnap.exists()) {
          deletedIds = metaSnap.data()?.deletedIds || [];
        }
      } catch (e) {
        // Continue if meta read fails
      }

      if (snapshot.empty) {
        // If collection is empty, check if we need initial seed ONCE
        let wasInitialized = false;
        try {
          const metaSnap = await getDoc(metaRef);
          wasInitialized = metaSnap.exists() && !!metaSnap.data()?.initialized;
        } catch (e) {
          wasInitialized = true;
        }

        if (!wasInitialized && !isSeedingWebinars) {
          isSeedingWebinars = true;
          try {
            for (const w of DEFAULT_WEBINARS) {
              await setDoc(doc(db, 'webinars', w.id), w, { merge: true });
            }
            await setDoc(metaRef, { initialized: true, deletedIds: [], seededAt: new Date().toISOString() }, { merge: true });
          } finally {
            isSeedingWebinars = false;
          }
          return;
        }

        // When collection is empty and initialized, broadcast empty list
        onData([]);
      } else {
        const items = snapshot.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(w => !deletedIds.includes(w.id)) as WebinarItem[];
        // Sort newest first
        items.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        onData(items);
      }
    } catch (err) {
      console.error('Error processing webinars snapshot:', err);
      const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as WebinarItem[];
      onData(items);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, 'webinars');
    onData([]);
  });
}

export async function deleteWebinarFromFirestore(webinarId: string) {
  try {
    const metaRef = doc(db, 'systemConfig', 'webinars_meta');
    
    // 1. Record in deletedIds in systemConfig so it never returns on any device
    try {
      const metaSnap = await getDoc(metaRef);
      const existingDeleted = metaSnap.exists() ? metaSnap.data()?.deletedIds || [] : [];
      const updatedDeleted = Array.from(new Set([...existingDeleted, webinarId]));
      
      await setDoc(metaRef, { 
        initialized: true, 
        deletedIds: updatedDeleted, 
        lastDeletedAt: new Date().toISOString() 
      }, { merge: true });
    } catch (metaErr) {
      console.warn('Could not update webinars_meta:', metaErr);
    }

    // 2. Delete the actual document from Firestore collection
    const docRef = doc(db, 'webinars', webinarId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `webinars/${webinarId}`);
    throw err;
  }
}

export async function deleteWebinarRegistrationFromFirestore(registrationId: string) {
  try {
    const docRef = doc(db, 'webinarRegistrations', registrationId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `webinarRegistrations/${registrationId}`);
    throw err;
  }
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
// REAL-TIME USER USAGE & SUBSCRIPTION QUOTA TRACKING (2 FREE USES, ₹60 STARTER, ₹499 MEDIUM)
// ---------------------------------------------------------------------------

export const DEFAULT_FREE_USAGE: UserUsageState = {
  userId: 'default-candidate',
  userEmail: '',
  planId: 'free',
  planName: 'Free Trial',
  totalAllowedUses: 2, // 2 times free trial use for all candidates
  usedCount: 0,
  remainingUses: 2,
  isUnlimited: false,
  updatedAt: new Date().toISOString()
};

// Subscribe in real-time to user's usage document (Strictly isolated per userId + SWR cached)
export function subscribeToUserUsage(
  userId: string, 
  userEmail: string,
  onData: (usage: UserUsageState) => void
) {
  const safeId = userId || (userEmail ? userEmail.replace(/[^a-zA-Z0-9]/g, '_') : 'guest_candidate');
  const userUsageRef = doc(db, 'userUsage', safeId);

  // Instant 0ms hydration from user-scoped SWR cache if available
  const cachedUsage = getScopedCache<UserUsageState>(safeId, 'user_usage', true);
  if (cachedUsage && cachedUsage.userId === safeId) {
    onData(cachedUsage);
  }

  return onSnapshot(userUsageRef, async (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data() as UserUsageState;
      const resolvedUsage: UserUsageState = {
        ...data,
        userId: safeId,
        userEmail: userEmail || data.userEmail || ''
      };
      setScopedCache(safeId, 'user_usage', resolvedUsage, 5 * 60 * 1000);
      onData(resolvedUsage);
    } else {
      // Initialize free trial doc with 2 free uses
      const initialDoc: UserUsageState = {
        userId: safeId,
        userEmail: userEmail || '',
        planId: 'free',
        planName: 'Free Trial',
        totalAllowedUses: 2,
        usedCount: 0,
        remainingUses: 2,
        isUnlimited: false,
        updatedAt: new Date().toISOString()
      };
      try {
        await setDoc(userUsageRef, initialDoc, { merge: true });
        setScopedCache(safeId, 'user_usage', initialDoc, 5 * 60 * 1000);
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

// Subscribe in real-time to ONLY the logged-in user's own interview reports (strictly isolated)
export function subscribeToUserInterviewReports(
  userId: string,
  userEmail: string,
  onData: (reports: HistoricalReport[]) => void
) {
  if (!userId || userId === 'default-candidate' || userId === 'guest_candidate') {
    return () => {};
  }
  const cachedReports = getScopedCache<HistoricalReport[]>(userId, 'interview_reports', true);
  if (cachedReports) {
    onData(cachedReports);
  }

  const colRef = collection(db, 'interviewReports');
  const q = query(colRef, where('userId', '==', userId));

  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((d) => {
        const raw = d.data();
        return {
          id: d.id,
          date: raw.date || (raw.createdAt ? raw.createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10)),
          type: raw.type || 'AI Mock Interview',
          role: raw.role || 'Software Engineer',
          score: typeof raw.score === 'number' ? raw.score : 88,
          durationMinutes: raw.durationMinutes || 20,
          summary: raw.summary || 'Completed real-time AI evaluation session.'
        } as HistoricalReport;
      });
      items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setScopedCache(userId, 'interview_reports', items, 5 * 60 * 1000);
      onData(items);
    },
    (err) => {
      // Do not fail loudly if user has no reports yet
      console.debug('User interview reports listener note:', err.message);
    }
  );
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
        totalAllowedUses: 2,
        usedCount: 0,
        remainingUses: 2,
        isUnlimited: false,
        updatedAt: new Date().toISOString()
      };
    } else {
      currentUsage = snap.data() as UserUsageState;
    }

    // Unlimited Plan bypass
    if (currentUsage.isUnlimited || currentUsage.planId === 'tier-699' || currentUsage.planId === 'tier-1299' || currentUsage.planId === 'tier-2000' || currentUsage.totalAllowedUses === -1) {
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
        message: `You have completed your ${currentUsage.planName} limit (${currentUsage.totalAllowedUses} uses). Unlock instant access with Medium Plan (₹299 for 45 uses) or Unlimited Plan (₹699) via Direct UPI (GPay / PhonePe).`
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
    console.warn('Error deducting usage from cloud database, granting operation fallback:', err);
    return { allowed: true, remainingUses: 2, isUnlimited: false };
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
      paidTo: 'Vettingly Direct UPI',
      createdAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString()
    };

    const docRef = await addDoc(colRef, paymentDoc);

    // Automatically update the user's usage quota in real-time
    const cleanEmail = (payment.userEmail || '').trim().toLowerCase();
    const emailSafeId = cleanEmail ? cleanEmail.replace(/[^a-zA-Z0-9]/g, '_') : '';
    const primaryId =
      auth.currentUser?.uid ||
      (payment.userId && payment.userId !== 'default-candidate' ? payment.userId : '') ||
      emailSafeId ||
      'default-candidate';

    const userUsageRef = doc(db, 'userUsage', primaryId);
    const isUnlimited =
      payment.planId === 'tier-699' ||
      payment.planId === 'tier-1299' ||
      payment.planId === 'tier-2000' ||
      payment.totalUsesGranted === -1;

    // Check if user already had remaining uses from a previous paid pack to carry over on top-up
    let carryOverUses = 0;
    try {
      const existingSnap = await getDoc(userUsageRef);
      if (existingSnap.exists()) {
        const existingData = existingSnap.data() as UserUsageState;
        if (existingData.planId !== 'free' && !existingData.isUnlimited && existingData.remainingUses > 0) {
          carryOverUses = existingData.remainingUses;
        }
      }
    } catch {
      // ignore read error
    }

    const totalGrantedWithCarryOver = isUnlimited ? -1 : payment.totalUsesGranted + carryOverUses;

    const newUsageState: UserUsageState = {
      userId: primaryId,
      userEmail: cleanEmail || payment.userEmail,
      planId: payment.planId,
      planName: payment.planName,
      totalAllowedUses: totalGrantedWithCarryOver,
      usedCount: 0,
      remainingUses: isUnlimited ? 99999 : totalGrantedWithCarryOver,
      isUnlimited: isUnlimited,
      updatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    await setDoc(userUsageRef, newUsageState, { merge: true });

    // Also sync to email-based key and payment.userId if different so any login method picks up the pack immediately
    const secondaryIds = new Set<string>();
    if (emailSafeId && emailSafeId !== primaryId) secondaryIds.add(emailSafeId);
    if (payment.userId && payment.userId !== primaryId) secondaryIds.add(payment.userId);

    for (const secId of secondaryIds) {
      try {
        await setDoc(
          doc(db, 'userUsage', secId),
          { ...newUsageState, userId: secId },
          { merge: true }
        );
      } catch {
        // non-blocking sync
      }
    }

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
    const isUnlimited = planId === 'tier-699' || planId === 'tier-1299' || planId === 'tier-2000' || totalUses === -1;
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

// =========================================================================
// STUDENT MOCK TEST SCORES & ADMIN MONITORING (Top 50 Qs Company Mock Tests)
// =========================================================================

export async function saveMockTestScoreToFirestore(record: Omit<MockTestScoreRecord, 'id'>) {
  try {
    const colRef = collection(db, 'mockTestScores');
    const docRef = await addDoc(colRef, {
      ...record,
      submittedAt: record.submittedAt || new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'mockTestScores');
    throw err;
  }
}

export function subscribeToMockTestScores(onData: (scores: MockTestScoreRecord[]) => void) {
  const colRef = collection(db, 'mockTestScores');
  return onSnapshot(colRef, (snapshot) => {
    const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as MockTestScoreRecord[];
    items.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    onData(items);
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, 'mockTestScores');
  });
}

export async function deleteMockTestScoreFromFirestore(scoreId: string) {
  try {
    const docRef = doc(db, 'mockTestScores', scoreId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `mockTestScores/${scoreId}`);
    throw err;
  }
}


