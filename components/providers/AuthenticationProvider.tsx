import User, { UserType } from "@lib/client/api/User";
import WrapperError from "@lib/server/error";
import SigninPage from "@components/dashboard/auth/SigninPage";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";
import ErrorScreen from "@components/dashboard/ErrorScreen";
import FullScreenLoader from "@components/dashboard/FullScreenLoader";

type StateType = UserType | null | "loading";

export const AuthenticationContext = createContext<{
    user: StateType;
    setUser: Dispatch<SetStateAction<StateType>>;
}>(null);

export const useUser = () => {
    const { user, setUser } = useContext(AuthenticationContext);

    return user;
};

export type AuthenticationProviderProps = PropsWithChildren<{}>;

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
    const [user, setUser] = useState<StateType>("loading");
    const [error, setError] = useState<WrapperError>();

    const loadUser = () => {
        (async () => {
            try {    
                const user = await User.get();
                setTimeout(() => setUser(user), 1200);
            } catch(e) {
                setError(e);
            }
        })();
    };

    useEffect(() => {
        loadUser();
    }, []);

    if(error) return (<ErrorScreen error={error} />);

    if(user === "loading") {
        return (
            <FullScreenLoader />
        );
    }

    if(user === null) return (
        <SigninPage onAuth={() => loadUser()} />
    );

    return (
        <AuthenticationContext.Provider value={{ user, setUser }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;