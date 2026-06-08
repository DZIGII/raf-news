import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { register } from "../../api/authApi";
import { getUserById, updateUserByAdmin } from "../../api/userApi";

const UserFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("CREATOR");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            loadUser();
        }
    }, [id]);

    const loadUser = async () => {
        try {
            const res = await getUserById(id);
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setEmail(res.data.email);
            setRole(res.data.role);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!firstName.trim()) {
            setError("Ime je obavezno");
            return;
        }
        if (!lastName.trim()) {
            setError("Prezime je obavezno");
            return;
        }
        if (!email.trim()) {
            setError("Email je obavezan");
            return;
        }

        setLoading(true);

        try {
            if (isEdit) {
                await updateUserByAdmin(id, {
                    firstName,
                    lastName,
                    email,
                    role
                });
            } else {
                if (!password) {
                    setError("Lozinka je obavezna");
                    setLoading(false);
                    return;
                }
                if (password !== passwordConfirm) {
                    setError("Lozinke se ne poklapaju");
                    setLoading(false);
                    return;
                }

                await register({
                    firstName,
                    lastName,
                    email,
                    password,
                    passwordConfirm,
                    role
                });
            }

            navigate("/cms/users");
        } catch (err) {
            setError(err.response?.data?.error || "Greska pri cuvanju korisnika");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "10px 12px",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        fontSize: "16px",
        background: "var(--bg)",
        color: "var(--text-h)",
        boxSizing: "border-box",
        outline: "none"
    };

    const labelStyle = {
        display: "block",
        marginBottom: "6px",
        fontSize: "14px",
        color: "var(--text)"
    };

    return (
        <div style={{ maxWidth: "500px" }}>
            <h1>{isEdit ? "Izmeni korisnika" : "Novi korisnik"}</h1>

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

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                    <label style={labelStyle}>Ime</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={inputStyle}
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={labelStyle}>Prezime</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={inputStyle}
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={labelStyle}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={labelStyle}>Tip</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="CREATOR">Stvaralac sadrzaja</option>
                        <option value="ADMIN">Administrator</option>
                    </select>
                </div>

                {!isEdit && (
                    <>
                        <div style={{ marginBottom: "20px" }}>
                            <label style={labelStyle}>Lozinka</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={labelStyle}>Potvrda lozinke</label>
                            <input
                                type="password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                    </>
                )}

                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: "10px 24px",
                            background: "var(--accent)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "15px",
                            fontWeight: "500",
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? "Cuvanje..." : "Sacuvaj"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/cms/users")}
                        style={{
                            padding: "10px 24px",
                            background: "transparent",
                            color: "var(--text)",
                            border: "1px solid var(--border)",
                            borderRadius: "6px",
                            fontSize: "15px",
                            cursor: "pointer"
                        }}
                    >Nazad</button>
                </div>
            </form>
        </div>
    );
};

export default UserFormPage;
