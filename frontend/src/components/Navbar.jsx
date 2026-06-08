import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const { user, logout, isAdmin, isCreator } = useAuth();

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const res = await getCategories(1, 50);
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "15px",
            borderBottom: "1px solid #ccc",
            marginBottom: "20px",
            flexWrap: "wrap"
        }}>
            <Link to="/" style={{ fontWeight: "bold" }}>Pocetna</Link>
            <Link to="/most-read">Najcitanije</Link>

            {categories.map((cat) => (
                <Link key={cat.categoryId} to={`/category/${cat.categoryId}`}>
                    {cat.name}
                </Link>
            ))}

            <form onSubmit={handleSearch} style={{ marginLeft: "auto", display: "flex", gap: "5px" }}>
                <input
                    type="text"
                    placeholder="Pretrazi vesti..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: "5px" }}
                />
                <button type="submit" style={{ padding: "5px 10px" }}>Pretrazi</button>
            </form>

            {user ? (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "14px", color: "var(--text)" }}>{user.name}</span>
                    {(isAdmin() || isCreator()) && (
                        <Link to="/cms/news" style={{ fontSize: "14px" }}>CMS</Link>
                    )}
                    <button
                        onClick={handleLogout}
                        style={{ padding: "5px 10px", fontSize: "14px" }}
                    >Odjavi se</button>
                </div>
            ) : (
                <Link to="/login" style={{ fontSize: "14px" }}>Prijavi se</Link>
            )}
        </nav>
    );
};

export default Navbar;
