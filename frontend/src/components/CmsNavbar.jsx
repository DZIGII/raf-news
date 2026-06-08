import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CmsNavbar = () => {
    const { user, logout, isAdmin } = useAuth();

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
                borderBottom: "1px solid #ccc",
            }}
        >
            <div style={{ display: "flex", gap: "15px" }}>
                <Link to="/cms/categories">Categories</Link>
                <Link to="/cms/news">News</Link>
                <Link to="/cms/search">Search</Link>

                {isAdmin() && (
                    <Link to="/cms/users">Users</Link>
                )}
            </div>

            <div style={{ display: "flex", gap: "15px" }}>
                <span>{user?.email}</span>

                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default CmsNavbar;