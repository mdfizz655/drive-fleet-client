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
import { auth } from "../firebase/firebase.config"; 
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

// তোমার রেন্ডার সার্ভারের লিঙ্ক (শেষে স্ল্যাশ দিও না)
const API_URL = "https://drive-fleet-server.onrender.com";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ১. ইমেইল ও পাসওয়ার্ড দিয়ে নতুন ইউজার তৈরি
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // ২. লগইন করা
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // ৩. গুগল লগইন
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // ৪. লগআউট
    const logOut = async () => {
        setLoading(true);
        try {
            // লগআউট করার সময় সার্ভারের কুকি পরিষ্কার করা
            await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
        } catch (error) {
            console.error("Logout error from server", error);
        }
        return signOut(auth);
    }

    // ৫. ইউজারের নাম ও ছবি আপডেট করা
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    // --- ইউজারের স্টেট পর্যবেক্ষণ করা এবং JWT টোকেন ম্যানেজ করা ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('Current Auth State:', currentUser?.email);

            if (currentUser?.email) {
                const userInfo = { email: currentUser.email };
                
                // সার্ভার থেকে JWT টোকেন নেওয়া এবং কুকিতে সেভ করা
                axios.post(`${API_URL}/jwt`, userInfo, { withCredentials: true })
                    .then(res => {
                        if (res.data.success) {
                            console.log('JWT Token successfully set in Cookie');
                            setLoading(false);
                        }
                    })
                    .catch(err => {
                        console.error('JWT Error:', err);
                        setLoading(false);
                    });
            } else {
                // ইউজার না থাকলে কুকি ক্লিয়ার করা
                axios.post(`${API_URL}/logout`, {}, { withCredentials: true })
                    .then(() => {
                        setLoading(false);
                    });
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