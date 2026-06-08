import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, deleteCategory } from "../../api/categoryApi";
import { filterNews } from "../../api/newsApi";
import Pagination from "../../components/Pagination";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCategories();
    }, [page]);

    const loadCategories = async () => {
        try {
            const res = await getCategories(page, 10);
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        setError("");
        try {
            await deleteCategory(id);
            loadCategories();
        } catch (err) {
            setError(err.response?.data?.error || "Greska pri brisanju kategorije");
        }
    };

    return (
        <div>
            <h1>Kategorije</h1>

            <Link to="/cms/categories/new">
                <button style={{ marginBottom: "15px", padding: "8px 15px" }}>Dodaj kategoriju</button>
            </Link>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
                        <th style={{ padding: "10px" }}>Ime</th>
                        <th style={{ padding: "10px" }}>Opis</th>
                        <th style={{ padding: "10px" }}>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.categoryId} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "10px" }}>
                                <Link to={`/cms/news?categoryId=${cat.categoryId}`}>
                                    {cat.name}
                                </Link>
                            </td>
                            <td style={{ padding: "10px" }}>{cat.description}</td>
                            <td style={{ padding: "10px", display: "flex", gap: "10px" }}>
                                <Link to={`/cms/categories/edit/${cat.categoryId}`}>Izmeni</Link>
                                <button onClick={() => handleDelete(cat.categoryId)}>Obrisi</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    );
};

export default CategoriesPage;
