import post from "./fetch/post";

export default class RefreshToken {
    public static async refresh() {
        return await post<{ message: "successful_refresh_token" }>("/auth/refresh", {
            body: JSON.stringify({
                web: true,
            }),
        });
    }
}