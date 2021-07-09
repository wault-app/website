import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";

type SearchContextType = {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextType>(null);

export type SearchProviderProps = PropsWithChildren<{}>;

export const useSearch = () => {
    return useContext(SearchContext);
};

const SearchProvider = (props: SearchProviderProps) => {
    const [value, setValue] = useState("");

    return (
        <SearchContext.Provider value={{ value, setValue }}>
            {props.children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;