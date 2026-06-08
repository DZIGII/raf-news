import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.email.trim()) {
            setError("Email je obavezan");
            return;
        }
        if (!form.password.trim()) {
            setError("Lozinka je obavezna");
            return;
        }

        setLoading(true);

        try {
            const user = await login(form.email, form.password);

            if (user.role === "ADMIN" || user.role === "CREATOR") {
                navigate("/cms/news");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Greska pri prijavljivanju");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg)"
        }}>
            <div style={{
                width: "100%",
                maxWidth: "420px",
                padding: "40px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                background: "var(--bg)"
            }}>
                <h2 style={{
                    textAlign: "center",
                    marginBottom: "30px",
                    color: "var(--text-h)",
                    fontSize: "28px",
                    fontWeight: "500"
                }}>Prijava</h2>

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
                        <label style={{
                            display: "block",
                            marginBottom: "6px",
                            fontSize: "14px",
                            color: "var(--text)"
                        }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                border: "1px solid var(--border)",
                                borderRadius: "6px",
                                fontSize: "16px",
                                background: "var(--bg)",
                                color: "var(--text-h)",
                                boxSizing: "border-box",
                                outline: "none"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <label style={{
                            display: "block",
                            marginBottom: "6px",
                            fontSize: "14px",
                            color: "var(--text)"
                        }}>Lozinka</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                border: "1px solid var(--border)",
                                borderRadius: "6px",
                                fontSize: "16px",
                                background: "var(--bg)",
                                color: "var(--text-h)",
                                boxSizing: "border-box",
                                outline: "none"
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "12px",
                            background: "var(--accent)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "16px",
                            fontWeight: "500",
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? "Prijavljivanje..." : "Prijavi se"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
