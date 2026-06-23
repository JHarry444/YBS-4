import { Link } from "react-router";

function NavBar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/counter">Counter</Link>
            <Link to="/trainer">Trainer</Link>
            <Link to="/external">External Data</Link>
        </nav>
    );

}

export default NavBar;