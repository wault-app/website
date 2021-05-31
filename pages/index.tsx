import AccountItem from "@components/screens/dashboard/accounts/AccountItem";
import PlatformIcon from "@components/screens/dashboard/platforms/PlatformIcon";
import { Card, Container, List, ListSubheader } from "@material-ui/core";

const MainPage = () => {

    return (
        <Container maxWidth={"sm"}>
            <Card>
                <List>
                    <ListSubheader>
                        Test vault
                    </ListSubheader>
                    <AccountItem
                        account={{
                            platform: "discord.com",
                            username: "pepyta118@gmail.com",
                            password: "password123",
                            description: "Lorem ipsum dolor", 
                            categories: ["work", "social", "games"],
                        }}
                    />
                </List>
            </Card>
        </Container>
    );
};

export default MainPage;