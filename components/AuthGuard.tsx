import {useRouter} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {useEffect} from "react";
import {setUserData, clearUserData} from "@/store/slices/userSlice";
import {auth} from "@/db/firebase/fireBaseConfig";
import {onAuthStateChanged} from "@firebase/auth";

export function AuthGuard() {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            console.log('auth state changed, user:', user?.uid);
            if (user) {
                dispatch(setUserData({ id: user.uid, email: user.email! }));
            } else {
                dispatch(clearUserData());
            }
        });
    }, []);

    useEffect(() => {
        console.log('isLoggedIn changed:', isLoggedIn);
        const timeout = setTimeout(() => {
            if (!isLoggedIn) {
                router.replace('/auth');
            } else {
                router.replace('/');
            }
        }, 0);
        return () => clearTimeout(timeout);
    }, [isLoggedIn]);

    return null;
}