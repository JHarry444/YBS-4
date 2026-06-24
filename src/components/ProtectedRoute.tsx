import { useContext } from "react";
import AuthContext from "../context/auth";

function ProtectedRoute(props) {
    const { role } = useContext(AuthContext);
    return (
        <>
            {role === "ADMIN" ? props.children : <h1>Access Denied</h1>}
        </>
    );
}

export default ProtectedRoute;