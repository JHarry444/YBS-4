import { useContext } from "react";
import { Link } from "react-router";
import AuthContext from "../context/auth";

function NavBar() {
    const { role } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/counter">Counter</Link>
            <Link to="/trainer">Trainer</Link>
            <Link to="/external">External Data</Link>
            <Link to="/register">Register</Link>
            {role === "ADMIN" && <Link to="/admin">Admin</Link>}
        </nav>
    );

}

export default NavBar;