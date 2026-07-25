/**
 * ============================================================================
 * FIRESTORE SERVICE
 * ============================================================================
 * Generic, reusable CRUD helpers on top of Cloud Firestore. Feature-specific
 * services (players, teams, leagues, etc. — added in later phases) should
 * build on top of these functions instead of importing Firestore directly
 * in every page, keeping query logic consistent and easy to change later
 * (e.g. adding caching or logging in one place).
 * ============================================================================
 */

import { db } from "../config/firebase-config.js";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/**
 * Add a new document to a collection with automatic timestamps.
 * @param {string} collectionPath
 * @param {Object} data
 * @returns {Promise<string>} the new document's ID
 */
export async function createDocument(collectionPath, data) {
  const ref = await addDoc(collection(db, collectionPath), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

/**
 * Create/overwrite a document with a specific, known ID.
 */
export async function setDocument(collectionPath, id, data, merge = true) {
  await setDoc(
    doc(db, collectionPath, id),
    { ...data, updatedAt: serverTimestamp() },
    { merge }
  );
}

/**
 * Update fields on an existing document.
 */
export async function updateDocument(collectionPath, id, data) {
  await updateDoc(doc(db, collectionPath, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a document.
 */
export async function deleteDocument(collectionPath, id) {
  await deleteDoc(doc(db, collectionPath, id));
}

/**
 * Fetch a single document by ID.
 * @returns {Promise<Object|null>}
 */
export async function getDocument(collectionPath, id) {
  const snap = await getDoc(doc(db, collectionPath, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/**
 * Fetch a list of documents with optional filters, ordering and pagination.
 *
 * @param {string} collectionPath
 * @param {Object} [options]
 * @param {Array<[string, string, any]>} [options.filters] - e.g. [["status", "==", "active"]]
 * @param {[string, "asc"|"desc"]} [options.orderByField]
 * @param {number} [options.pageSize]
 * @param {Object} [options.startAfterDoc] - the raw QueryDocumentSnapshot to paginate from
 */
export async function listDocuments(collectionPath, options = {}) {
  const { filters = [], orderByField, pageSize, startAfterDoc } = options;

  const constraints = filters.map(([field, op, value]) => where(field, op, value));
  if (orderByField) constraints.push(orderBy(orderByField[0], orderByField[1] || "asc"));
  if (startAfterDoc) constraints.push(startAfter(startAfterDoc));
  if (pageSize) constraints.push(limit(pageSize));

  const q = query(collection(db, collectionPath), ...constraints);
  const snap = await getDocs(q);

  return {
    docs: snap.docs.map((d) => ({ id: d.id, ...d.data() })),
    lastDoc: snap.docs[snap.docs.length - 1] || null,
    isEmpty: snap.empty,
  };
}

/**
 * Subscribe to real-time updates on a collection (for live dashboards,
 * live scores, notifications, etc). Returns an unsubscribe function.
 *
 * @param {string} collectionPath
 * @param {Object} [options] - same shape as listDocuments' options
 * @param {(docs: Array<Object>) => void} callback
 */
export function watchCollection(collectionPath, options, callback) {
  const { filters = [], orderByField, pageSize } = options || {};
  const constraints = filters.map(([field, op, value]) => where(field, op, value));
  if (orderByField) constraints.push(orderBy(orderByField[0], orderByField[1] || "asc"));
  if (pageSize) constraints.push(limit(pageSize));

  const q = query(collection(db, collectionPath), ...constraints);
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    (err) => console.error(`[Firestore] watchCollection(${collectionPath}) error:`, err)
  );
}

/**
 * Subscribe to real-time updates on a single document.
 */
export function watchDocument(collectionPath, id, callback) {
  return onSnapshot(
    doc(db, collectionPath, id),
    (snap) => callback(snap.exists() ? { id: snap.id, ...snap.data() } : null),
    (err) => console.error(`[Firestore] watchDocument(${collectionPath}/${id}) error:`, err)
  );
}
