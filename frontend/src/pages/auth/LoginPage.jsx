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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await login(
                form.email,
                form.password
            );

            if (
                user.role === "ADMIN" ||
                user.role === "CREATOR"
            ) {
                navigate("/cms/news");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "50px auto"
            }}
        >
            <h2>Login</h2>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />

                <br />
                <br />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;