import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav
            style={{
                display: "flex",
                gap: "20px",
                padding: "15px",
                borderBottom: "1px solid #ccc",
                marginBottom: "20px",
            }}
        >
            <Link to="/">Home</Link>
            <Link to="/most-read">Most Read</Link>
        </nav>
    );
};

export default Navbar;