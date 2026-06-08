import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopReactions } from "../api/newsApi";

const SidebarTopNews = () => {
    const [topNews, setTopNews] = useState([]);

    useEffect(() => {
        loadTopNews();
    }, []);

    const loadTopNews = async () => {
        try {
            const res = await getTopReactions();
            setTopNews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px"
        }}>
            <h3>Najvise reakcija</h3>

            {topNews.length === 0 && <p>Nema podataka.</p>}

            {topNews.map((item) => (
                <div key={item.newsId} style={{ marginBottom: "10px" }}>
                    <Link to={`/news/${item.newsId}`}>
                        {item.title}
                    </Link>
                    <small style={{ display: "block", color: "#666" }}>
                        {item.like + item.dislike} reakcija
                    </small>
                </div>
            ))}
        </div>
    );
};

export default SidebarTopNews;
