import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNews, updateNews, getNewsById } from "../../api/newsApi";
import { getCategories } from "../../api/categoryApi";

const NewsFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [tags, setTags] = useState("");
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCategories();
        if (isEdit) {
            loadNews();
        }
    }, [id]);

    const loadCategories = async () => {
        try {
            const res = await getCategories(1, 50);
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const loadNews = async () => {
        try {
            const res = await getNewsById(id);
            setTitle(res.data.title);
            setText(res.data.text);
            setCategoryId(res.data.category?.categoryId || "");
            setTags(
                res.data.tags
                    ?.map((t) => t.keyword)
                    .join(", ") || ""
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title.trim()) {
            setError("Naslov je obavezan");
            return;
        }
        if (!text.trim()) {
            setError("Tekst je obavezan");
            return;
        }
        if (!categoryId) {
            setError("Kategorija je obavezna");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("text", text);
            formData.append("categoryId", categoryId);

            const parsedTags = tags
                .split(",")
                .filter(t => t.trim() !== "")
                .map((tag) => ({ keyword: tag.trim() }));

            formData.append("tags", JSON.stringify(parsedTags));

            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i]);
            }

            if (isEdit) {
                await updateNews(id, formData);
            } else {
                await createNews(formData);
            }

            navigate("/cms/news");
        } catch (err) {
            setError(err.response?.data?.error || "Greska pri cuvanju vesti");
        }
    };

    return (
        <div>
            <h1>{isEdit ? "Izmeni vest" : "Nova vest"}</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Naslov:</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ padding: "8px", width: "400px" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Kategorija:</label><br />
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        style={{ padding: "8px", width: "400px" }}
                    >
                        <option value="">-- Izaberi kategoriju --</option>
                        {categories.map((cat) => (
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Tekst:</label><br />
                    <textarea
                        rows={10}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{ padding: "8px", width: "400px" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Tagovi (razdvojeni zarezom):</label><br />
                    <input
                        type="text"
                        placeholder="tag1, tag2, tag3"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        style={{ padding: "8px", width: "400px" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Slike:</label><br />
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setImages(e.target.files)}
                    />
                </div>

                <button type="submit" style={{ padding: "8px 20px" }}>Sacuvaj</button>
            </form>
        </div>
    );
};

export default NewsFormPage;
