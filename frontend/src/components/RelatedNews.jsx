import { Link } from "react-router-dom";

const RelatedNews = ({ news = [] }) => {
    if (news.length === 0) return null;

    return (
        <div style={{ margin: "15px 0" }}>
            <h3>Procitaj jos...</h3>

            {news.map((item) => (
                <div key={item.newsId} style={{ marginBottom: "8px" }}>
                    <Link to={`/news/${item.newsId}`}>
                        {item.title}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default RelatedNews;
