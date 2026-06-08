import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, toggleUserActive, deleteUser } from "../../api/userApi";
import Pagination from "../../components/Pagination";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState("");

    useEffect(() => {
        loadUsers();
    }, [page]);

    const loadUsers = async () => {
        try {
            const res = await getUsers(page, 10);
            setUsers(res.data.users);
            setTotalPages(Math.ceil(res.data.total / 10));
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleActive = async (id) => {
        try {
            await toggleUserActive(id);
            loadUsers();
        } catch (err) {
            setError(err.response?.data?.error || "Greska pri promeni statusa");
        }
    };

    const handleDelete = async (id) => {
        setError("");
        try {
            await deleteUser(id);
            loadUsers();
        } catch (err) {
            setError(err.response?.data?.error || "Greska pri brisanju korisnika");
        }
    };

    return (
        <div>
            <h1>Korisnici</h1>

            <Link to="/cms/users/new">
                <button style={{
                    marginBottom: "20px",
                    padding: "10px 20px",
                    background: "var(--accent)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "15px",
                    fontWeight: "500",
                    cursor: "pointer"
                }}>Dodaj korisnika</button>
            </Link>

            {error && (
                <p style={{
                    color: "#e53e3e",
                    background: "rgba(229, 62, 62, 0.1)",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    marginBottom: "20px",
                    fontSize: "14px"
                }}>{error}</p>
            )}

            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                    <tr style={{ borderBottom: "2px solid var(--border)" }}>
                        <th style={{ padding: "12px 10px", color: "var(--text-h)", fontWeight: "500" }}>Ime i prezime</th>
                        <th style={{ padding: "12px 10px", color: "var(--text-h)", fontWeight: "500" }}>Email</th>
                        <th style={{ padding: "12px 10px", color: "var(--text-h)", fontWeight: "500" }}>Tip</th>
                        <th style={{ padding: "12px 10px", color: "var(--text-h)", fontWeight: "500" }}>Status</th>
                        <th style={{ padding: "12px 10px", color: "var(--text-h)", fontWeight: "500" }}>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.userId} style={{ borderBottom: "1px solid var(--border)" }}>
                            <td style={{ padding: "12px 10px" }}>
                                {user.firstName} {user.lastName}
                            </td>
                            <td style={{ padding: "12px 10px" }}>{user.email}</td>
                            <td style={{ padding: "12px 10px" }}>
                                {user.role === "ADMIN" ? "Administrator" : "Stvaralac sadrzaja"}
                            </td>
                            <td style={{ padding: "12px 10px" }}>
                                <span style={{
                                    padding: "3px 10px",
                                    borderRadius: "12px",
                                    fontSize: "13px",
                                    background: user.isActive ? "rgba(72, 187, 120, 0.15)" : "rgba(229, 62, 62, 0.1)",
                                    color: user.isActive ? "#38a169" : "#e53e3e"
                                }}>
                                    {user.isActive ? "Aktivan" : "Neaktivan"}
                                </span>
                            </td>
                            <td style={{ padding: "12px 10px", display: "flex", gap: "10px", alignItems: "center" }}>
                                <Link to={`/cms/users/edit/${user.userId}`}>Izmeni</Link>
                                {user.role === "CREATOR" && (
                                    <>
                                        <button
                                            onClick={() => handleToggleActive(user.userId)}
                                            style={{ padding: "4px 10px", fontSize: "13px", cursor: "pointer" }}
                                        >
                                            {user.isActive ? "Deaktiviraj" : "Aktiviraj"}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.userId)}
                                            style={{
                                                padding: "4px 10px",
                                                fontSize: "13px",
                                                cursor: "pointer",
                                                color: "#e53e3e",
                                                border: "1px solid rgba(229, 62, 62, 0.3)",
                                                background: "transparent",
                                                borderRadius: "4px"
                                            }}
                                        >Obrisi</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    );
};

export default UsersPage;
