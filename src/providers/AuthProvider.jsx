import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config"; 
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const API_URL = "https://drive-fleet-server.onrender.com";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => { setLoading(true); return createUserWithEmailAndPassword(auth, email, password); }
    const signIn = (email, password) => { setLoading(true); return signInWithEmailAndPassword(auth, email, password); }
    const googleLogin = () => { setLoading(true); return signInWithPopup(auth, googleProvider); }
    const logOut = async () => {
        setLoading(true);
        try { await axios.post(`${API_URL}/logout`, {}, { withCredentials: true }); } catch (e) {}
        return signOut(auth);
    }
    const updateUserProfile = (name, photo) => { return updateProfile(auth.currentUser, { displayName: name, photoURL: photo }); }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser?.email) {
                axios.post(`${API_URL}/jwt`, { email: currentUser.email }, { withCredentials: true })
                    .then(res => { if (res.data.success) setLoading(false); })
                    .catch(() => setLoading(false));
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const authInfo = { user, loading, createUser, signIn, googleLogin, logOut, updateUserProfile };
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};
export default AuthProvider;