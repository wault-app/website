import AccountCard from "@components/screens/dashboard/accounts/AccountCard";

const MainPage = () => {
    return (
        <AccountCard
            platform={"discord.com"}
            username={"pepyta118@gmail.com"}
            password={"password123"}
            categories={[]}
        />
    );
};

export default MainPage;