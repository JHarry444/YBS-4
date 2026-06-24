import { Outlet, useNavigation } from "react-router";
import NavBar from "../NavBar";
import Loading from "../Loading";

function RootLayout() {

    const navigation = useNavigation();


    console.log("NAV:", navigation);

    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                {navigation.state === "loading" ? <Loading /> : <Outlet />}
            </main>
        </>
    );
}

export default RootLayout;