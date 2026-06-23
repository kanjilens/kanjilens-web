import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  setDoc,
  onSnapshot,
  type QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";

export abstract class FirebaseRepository<TId = string> {
  protected uid: string;
  protected collectionName: string;
  protected db: Firestore;

  constructor(
    uid: string,
    collectionName: string,
    db: Firestore,
  ) {
    this.uid = uid;
    this.collectionName = collectionName;
    this.db = db;
  }

  protected subscribeCollection(
    callback: (
      snapshot: QuerySnapshot<DocumentData>,
    ) => void,
  ) {
    return onSnapshot(this.collection(), callback);
  }

  protected collection() {
    return collection(
      this.db,
      "users",
      this.uid,
      this.collectionName,
    );
  }

  protected document(id: TId) {
    return doc(
      this.db,
      "users",
      this.uid,
      this.collectionName,
      String(id),
    );
  }

  protected async getDocuments() {
    return getDocs(this.collection());
  }

  protected async getDocument(id: TId) {
    return getDoc(this.document(id));
  }

  protected async saveDocument(id: TId, data: any) {
    await setDoc(this.document(id), data);
  }

  protected async deleteDocument(id: TId) {
    await deleteDoc(this.document(id));
  }
}
