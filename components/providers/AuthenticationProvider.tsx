import User, { UserType } from "@lib/api/User";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";
import ErrorScreen from "@components/common/ErrorScreen";
import FullScreenLoader from "@components/common/FullScreenLoader";
import RedirectInProgressScreen from "@components/common/RedirectInProgressScreen";
import { useRouter } from "next/router";

type AuthenticationContextType = {
    user: UserType;
    setUser: Dispatch<SetStateAction<UserType>>;
};

export const AuthenticationContext = createContext<AuthenticationContextType>(null);

export const useUser = () => {
    return useContext(AuthenticationContext);
};

const CHECK_EXCLUDED = [
    "/auth/signin",
    "/auth/register/confirm",  
];

export type AuthenticationProviderProps = PropsWithChildren<{}>;

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState<UserType>();
    const [error, setError] = useState<Error>();

    const router = useRouter();

    const loadUser = () => {
        (async () => {
            try {    
                const user = await User.get();
                setTimeout(() => {
                    setUser(user);
                    setLoading(false);
                }, 1200);
            } catch(e) {
                if(e.message === "device_not_found" || e.message === "invalid_refresh_token") {
                    setLoading(false);
                    setUser(null);
                } else {
                    setError(e);
                }
            }
        })();
    };

    useEffect(() => {
        loadUser();
    }, []);

    if(error) return (<ErrorScreen error={error} />);

    if(isLoading) {
        return (
            <FullScreenLoader />
        );
    }

    if(!user && !CHECK_EXCLUDED.includes(router.pathname)) {
        router.push("/auth/signin");

        return (
            <RedirectInProgressScreen />
        );
    }

    return (
        <AuthenticationContext.Provider value={{ user, setUser }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;