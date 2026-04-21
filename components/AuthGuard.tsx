import {usePathname, useRouter} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {useEffect} from "react";
import {setUserData, clearUserData} from "@/store/slices/userSlice";
import {auth} from "@/db/firebase/fireBaseConfig";
import {onAuthStateChanged} from "@firebase/auth";

const AUTH_REQUIRING_PAGES = ['/carCreate', '/carChange'];

export function AuthGuard() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUserData({ id: user.uid, email: user.email! }));
            } else {
                dispatch(clearUserData());
            }
        });
    }, [dispatch]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!isLoggedIn) {
                if (AUTH_REQUIRING_PAGES.includes(pathname)) {
                    router.replace('/auth');
                }
            } else {
                if (pathname === '/auth') {
                    router.replace('/');
                }
            }
        }, 0);
        return () => clearTimeout(timeout);
    }, [isLoggedIn, pathname, router]);

    return null;
}