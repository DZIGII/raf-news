import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const CmsNavbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/cms/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        }
    };

    return (
        <nav style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
            borderBottom: "1px solid #ccc",
            alignItems: "center"
        }}>
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <Link to="/cms/categories">Kategorije</Link>
                <Link to="/cms/news">Vesti</Link>

                {isAdmin() && (
                    <Link to="/cms/users">Korisnici</Link>
                )}

                <form onSubmit={handleSearch} style={{ display: "flex", gap: "5px" }}>
                    <input
                        type="text"
                        placeholder="Pretrazi vesti..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ padding: "5px" }}
                    />
                    <button type="submit" style={{ padding: "5px 10px" }}>Pretrazi</button>
                </form>
            </div>

            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <span>{user?.name}</span>
                <button onClick={handleLogout}>Odjavi se</button>
            </div>
        </nav>
    );
};

export default CmsNavbar;
