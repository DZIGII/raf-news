import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCategory, updateCategory, getCategoryById } from "../../api/categoryApi";

const CategoryFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isEdit) {
            loadCategory();
        }
    }, [id]);

    const loadCategory = async () => {
        try {
            const res = await getCategoryById(id);
            setName(res.data.name);
            setDescription(res.data.description);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Ime kategorije je obavezno");
            return;
        }
        if (!description.trim()) {
            setError("Opis kategorije je obavezan");
            return;
        }

        try {
            if (isEdit) {
                await updateCategory({
                    categoryId: Number(id),
                    name,
                    description
                });
            } else {
                await createCategory({ name, description });
            }
            navigate("/cms/categories");
        } catch (err) {
            setError(err.response?.data?.error || "Greska pri cuvanju kategorije");
        }
    };

    return (
        <div>
            <h1>{isEdit ? "Izmeni kategoriju" : "Nova kategorija"}</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Ime:</label><br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ padding: "8px", width: "300px" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Opis:</label><br />
                    <textarea
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ padding: "8px", width: "300px" }}
                    />
                </div>

                <button type="submit" style={{ padding: "8px 20px" }}>Sacuvaj</button>
            </form>
        </div>
    );
};

export default CategoryFormPage;
