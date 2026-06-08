import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNews, deleteNews } from "../../api/newsApi";

const NewsPage = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        try {
            const res = await getNews();
            setNews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete news?")) {
            return;
        }

        try {
            await deleteNews(id);
            loadNews();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>News</h1>

            <Link to="/cms/news/new">
                Add News
            </Link>

            <hr />

            {news.map((item) => (
                <div
                    key={item.newsId}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                >
                    <h3>{item.title}</h3>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px"
                        }}
                    >
                        <Link
                            to={`/cms/news/edit/${item.newsId}`}
                        >
                            Edit
                        </Link>

                        <button
                            onClick={() =>
                                handleDelete(
                                    item.newsId
                                )
                            }
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsPage;