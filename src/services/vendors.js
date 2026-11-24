import { collection, doc, onSnapshot, writeBatch, Timestamp } from 'firebase/firestore'
import { db } from '../firebase.js'

// Every subscribe function returns an unsubscribe function for useEffect cleanup.
export function subscribeToVendors(onData, onError) {
  return onSnapshot(
    collection(db, 'vendors'),
    (snapshot) => onData(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError,
  )
}

export function subscribeToVendor(vendorId, onData, onError) {
  return onSnapshot(
    doc(db, 'vendors', vendorId),
    (snap) => onData(snap.exists() ? { id: snap.id, ...snap.data() } : null),
    onError,
  )
}

// Menus are a subcollection: vendors/{vendorId}/menu/{itemId}
export function subscribeToMenu(vendorId, onData, onError) {
  return onSnapshot(
    collection(db, 'vendors', vendorId, 'menu'),
    (snapshot) =>
      onData(
        snapshot.docs.map((d) => ({
          id: d.id,
          vendorId,
          ...d.data(),
        })),
      ),
    onError,
  )
}

// One-off: copy public/api/vendors.json into Firestore. A batch writes all or nothing.
export async function seedDemoData(vendors) {
  const batch = writeBatch(db)

  // Default special expiration (10:00 PM tonight) for Personal Feature (Digit 5)
  const tonight = new Date()
  tonight.setHours(22, 0, 0, 0)
  const defaultSpecialEndsAt = Timestamp.fromDate(tonight)

  for (const { menu, id, ...vendor } of vendors) {
    batch.set(doc(db, 'vendors', id), vendor)
    for (const { id: itemId, ...item } of menu) {
      const itemData = { ...item }
      if (item.special) {
        itemData.special = true
        itemData.specialEndsAt = defaultSpecialEndsAt
      }
      batch.set(doc(db, 'vendors', id, 'menu', itemId), itemData)
    }
  }
  await batch.commit()
}
