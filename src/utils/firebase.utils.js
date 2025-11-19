import { initializeApp } from 'firebase/app';
import { signInWithPopup , GoogleAuthProvider , getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, writeBatch , query , getDocs} from 'firebase/firestore'
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut , onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD760GkNWacgzms7XqlKiUwciYSW0QajxU",
  authDomain: "new-dev-b41dc.firebaseapp.com",
  projectId: "new-dev-b41dc",
  storageBucket: "new-dev-b41dc.firebasestorage.app",
  messagingSenderId: "1011278927776",
  appId: "1:1011278927776:web:d20756241119ce022c76c5",
  measurementId: "G-7VS27F2RP0"
};

const app = initializeApp(firebaseConfig);

// After initializing an app, we initialize a provider in this case it is google
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account",
})

// next we use the popup function to call the authentication function of firebase and the
// google provider
export const auth = getAuth();
export const SignInWithGoogleAuth = () => signInWithPopup(auth, provider);


// Lets start by making a collection and storing all of our users in the storage
const db = getFirestore(app);

export const createCollection = async (collectionName, products) => {
  const collectionRef = collection(db, collectionName)

  // Since we have the collection ref, it's time to use writeBatch for adding data into firestore
  const batch = writeBatch(db);

  products.forEach((category) => {
    // Now since we have the collection ref, lets get the document ref
    const docRef = doc(collectionRef, category.title.toLowerCase());
    batch.set(docRef, category);
    // console.log(category);
  });

  await batch.commit();
  console.log("Products Added");

}

export const getCollectionDocs = async () => {
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef); // Usually we supply some query constraints, so that we can filter what documents are required.

  const querySnapshot = await getDocs(q);

  const categoryObjects = querySnapshot.docs.reduce((ac, iv) => {
    const {title, items} = iv.data(); // The docs property has data attribute to return us the data for each document

    ac[title.toLowerCase()] = items; // Since we already initialized the reduce function with the empty object, now we use the accumulator to accumulate each document into that empty object.

    return ac;
  }, {});

  console.log(categoryObjects);
  return categoryObjects;
}

export const createUserDocument = async (userAuth, AdditionalInformation = {}) => {
  
  // if(!Object.keys(AdditionalInformation).length === 0){ 
  //   userAuth.displayName = AdditionalInformation.username;
  // }

  // console.log(AdditionalInformation);
  const userDocumentRef = doc(db, 'users', userAuth.uid);

  // console.log(userDocumentRef);

  const getUserRef = await getDoc(userDocumentRef);
  // console.log(getUserRef);
  // console.log(getUserRef.exists());

  if(!getUserRef.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    // console.log(userAuth);
    try {
      await setDoc(userDocumentRef, {displayName, email, createdAt});
    }catch (err){
      console.log(err);
    }
  }
}

// Lets start by creating a user with email and password
export const createUserWithEmailAndPasswordFunc = async (email, password) => {
  if(!email || !password){
    return;
  }
  // Async function because anything that is contacting outside services is always async
  return await createUserWithEmailAndPassword(auth, email, password);
}

// Verify the email and password
export const signInUserWithEmailAndPasswordFunc = async (email, password) => {
  if(!email || !password){
    return;
  }

  // Async function because anything that is contacting outside services is always async
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);