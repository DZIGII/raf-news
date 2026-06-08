import { useState } from "react";

const CommentForm = ({ onSubmit }) => {
    const [authorName, setAuthorName] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!authorName.trim()) {
            setError("Ime je obavezno");
            return;
        }
        if (!content.trim()) {
            setError("Tekst komentara je obavezan");
            return;
        }

        onSubmit({ authorName, content });
        setAuthorName("");
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{ marginBottom: "10px" }}>
                <input
                    type="text"
                    placeholder="Vase ime"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    style={{ padding: "8px", width: "300px" }}
                />
            </div>

            <div style={{ marginBottom: "10px" }}>
                <textarea
                    placeholder="Tekst komentara"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    style={{ padding: "8px", width: "300px" }}
                />
            </div>

            <button type="submit" style={{ padding: "8px 15px" }}>Dodaj komentar</button>
        </form>
    );
};

export default CommentForm;
