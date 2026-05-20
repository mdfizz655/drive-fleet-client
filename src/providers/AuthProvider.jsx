import { createContext, useEffect, useState } from "react";
import { 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from "firebase/auth";
import { auth } from "../firebase/firebase.config"; // নিশ্চিত হও ইমপোর্ট ঠিক আছে
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = async () => {
        setLoading(true);
        try {
            await axios.post('https://drive-fleet-server-seven.vercel.app/logout', {}, { withCredentials: true });
        } catch (error) {
            console.error("Logout error", error);
        }
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            
            if (currentUser?.email) {
                const userInfo = { email: currentUser.email };
                axios.post('https://drive-fleet-server-seven.vercel.app/jwt', userInfo, { withCredentials: true })
                    .then(res => {
                        if (res.data.success) {
                            setLoading(false);
                        }
                    })
            } else {
                // ইউজার না থাকলে কুকি পরিষ্কার করার চেষ্টা করা
                axios.post('https://drive-fleet-server-seven.vercel.app/logout', {}, { withCredentials: true })
                    .then(() => {
                        setLoading(false);
                    })
            }
        });
        return () => unsubscribe();
    }, []);

    const authInfo = { 
        user, 
        loading, 
        createUser, 
        signIn, 
        googleLogin, 
        logOut, 
        updateUserProfile 
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;