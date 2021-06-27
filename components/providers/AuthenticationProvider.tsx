import User, { UserType } from "@lib/client/api/User";
import WrapperError from "@lib/server/error";
import SigninPage from "@components/dashboard/auth/SigninPage";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";

type StateType = UserType | null | "loading";

const AuthenticationContext = createContext<{
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
                setUser(user);
            } catch(e) {
                setError(e);
            }
        })();
    };

    useEffect(() => {
        loadUser();
    }, []);

    if(error) {
        // todo: error
        return (
            <div>
                {error}
            </div>
        );
    }

    if(user === "loading") {
        // TODO: loading
        return (
            <div>
                loading...
            </div>
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