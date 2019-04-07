export const range = (size, startAt = 0) => {
  return [...Array(size).keys()].map(i => i + startAt);
}

export const getDataFromFirebaseSnapshot = (snapshot) => {
  if (snapshot.docs) return snapshot.docs.map(getDataSnapshot);
  return getDataSnapshot(snapshot);
}

const getDataSnapshot = snapshot => ({ ...snapshot.data(), id: snapshot.id })
