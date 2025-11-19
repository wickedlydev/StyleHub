import { createContext, useEffect, useState } from 'react';
import { onAuthStateChangedListener , createUserDocument } from '../utils/firebase.utils.js';

// First thing is to initiate a context
export const UserContext = createContext({
    userStorage: null,
    setuserStorage: () => null
});

// Next we will call a function, that will inherit all childrens inside it
// Once that's done, we can provide the storage to those childrens

export const UserProvider = ({children}) => {
    const [userStorage, setuserStorage] = useState(null);

    // Whenever the component mounts, the useEffect will trigger
    // Now, whenever there are any changes, 
    useEffect(() => {
        let mounted = true;

        const unsubscribe = onAuthStateChangedListener(async (user) => {
            if (!mounted) return;

            if (user) {
                try {
                    await createUserDocument(user);
                } catch (err) {
                    console.error('createUserDocument failed:', err);
                }
            }

            setuserStorage(user);
        });

        return () => {
            mounted = false;
            unsubscribe();
        };
    }, []);
    return (
        <UserContext.Provider value={{userStorage, setuserStorage}}>
            {children}
        </UserContext.Provider>
    )
}