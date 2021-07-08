import User, { UserType } from "@lib/client/api/User";
import WrapperError from "@lib/server/error";
import SigninPage from "@components/dashboard/auth/SigninPage";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";
import ErrorScreen from "@components/dashboard/ErrorScreen";
import FullScreenLoader from "@components/dashboard/FullScreenLoader";

export const AuthenticationContext = createContext<{
    user: UserType;
    setUser: Dispatch<SetStateAction<UserType>>;
}>(null);

export const useUser = () => {
    const { user, setUser } = useContext(AuthenticationContext);

    return { user };
};

export type AuthenticationProviderProps = PropsWithChildren<{}>;

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState<UserType>();
    const [error, setError] = useState<WrapperError>();

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

    if(!user) return (
        <SigninPage onAuth={() => loadUser()} />
    );

    return (
        <AuthenticationContext.Provider value={{ user, setUser }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;