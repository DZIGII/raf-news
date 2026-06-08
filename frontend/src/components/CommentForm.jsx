import { useState } from "react";

const CommentForm = ({ onSubmit }) => {
    const [authorName, setAuthorName] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            authorName,
            content,
        });

        setAuthorName("");
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
            />

            <br />

            <textarea
                placeholder="Comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <br />

            <button type="submit">
                Add comment
            </button>
        </form>
    );
};

export default CommentForm;