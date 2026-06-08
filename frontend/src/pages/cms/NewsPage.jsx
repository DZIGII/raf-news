import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getNews, deleteNews, filterNews } from "../../api/newsApi";
import { useAuth } from "../../context/AuthContext";
import Pagination from "../../components/Pagination";

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState("");
    const { user, isAdmin } = useAuth();
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId");

    useEffect(() => {
        loadNews();
    }, [page, categoryId]);

    const loadNews = async () => {
        try {
            let res;
            if (categoryId) {
                res = await filterNews({ categoryId, page, limit: 10 });
            } else {
                res = await getNews(page, 10);
            }
            setNews(res.data.news);
            setTotalPages(Math.ceil(res.data.total / 10));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        setError("");
        if (!window.confirm("Da li ste sigurni?")) return;

        try {
            await deleteNews(id);
            loadNews();
        } catch (err) {
            setError(err.response?.data?.error || "Greska pri brisanju vesti");
        }
    };

    const canEditDelete = (item) => {
        return isAdmin() || item.authorName === user?.name;
    };

    return (
        <div>
            <h1>Vesti</h1>

            <Link to="/cms/news/new">
                <button style={{ marginBottom: "15px", padding: "8px 15px" }}>Dodaj vest</button>
            </Link>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
                        <th style={{ padding: "10px" }}>Naslov</th>
                        <th style={{ padding: "10px" }}>Autor</th>
                        <th style={{ padding: "10px" }}>Datum</th>
                        <th style={{ padding: "10px" }}>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map((item) => (
                        <tr key={item.newsId} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "10px" }}>
                                <Link to={`/news/${item.newsId}`} target="_blank">
                                    {item.title}
                                </Link>
                            </td>
                            <td style={{ padding: "10px" }}>{item.authorName}</td>
                            <td style={{ padding: "10px" }}>
                                {new Date(item.createdAt).toLocaleDateString('sr-RS')}
                            </td>
                            <td style={{ padding: "10px", display: "flex", gap: "10px" }}>
                                {canEditDelete(item) && (
                                    <>
                                        <Link to={`/cms/news/edit/${item.newsId}`}>Izmeni</Link>
                                        <button onClick={() => handleDelete(item.newsId)}>Obrisi</button>
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

export default NewsPage;
