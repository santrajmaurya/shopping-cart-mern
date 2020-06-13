import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBYmHN0rkcjGBy99N_OjsFMu3yDt0JeG5c",
  authDomain: "ecommerce-db-6cc17.firebaseapp.com",
  databaseURL: "https://ecommerce-db-6cc17.firebaseio.com",
  projectId: "ecommerce-db-6cc17",
  storageBucket: "ecommerce-db-6cc17.appspot.com",
  messagingSenderId: "1057591070597",
  appId: "1:1057591070597:web:4861d0bd304a7a59bdbeec",
  measurementId: "G-67ZSLH2RXL",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (
  userAuth: any,
  additionalData?: any
) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // const collectionRef = firestore.collection("users");

  const snapShot = await userRef.get();
  // const collectionSnapShot = await collectionRef.get();
  // console.log({ collection :collectionSnapShot.docs.map(doc => doc.data()) });

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const addColelctionAndDocuments = async (
  collectionKey: any,
  objectsToAdd: any
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj: any) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj)
  })
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections: any) => {
  const transformedCollection = collections.docs.map((doc: any) => {
    const { title, items } = doc.data();

    return {
      routeName : encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
  return transformedCollection.reduce((accumulator: any, collection: any) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  } ,{})
}



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
