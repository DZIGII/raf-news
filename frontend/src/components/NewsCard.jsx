import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
    const excerpt = news.text
        ? news.text.substring(0, 200) + (news.text.length > 200 ? "..." : "")
        : "";

    return (
        <div style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "5px"
        }}>
            {news.mainImage && (
                <img
                    src={`http://localhost:3000${news.mainImage}`}
                    alt={news.title}
                    style={{
                        width: "100%",
                        maxHeight: "250px",
                        objectFit: "cover",
                        marginBottom: "10px"
                    }}
                />
            )}

            <h3 style={{ margin: "0 0 5px 0" }}>
                <Link to={`/news/${news.newsId}`} style={{ textDecoration: "none", color: "#333" }}>
                    {news.title}
                </Link>
            </h3>

            <p style={{ color: "#555", margin: "5px 0" }}>{excerpt}</p>

            <div style={{ display: "flex", gap: "15px", color: "#888", fontSize: "0.9em" }}>
                {news.categoryName && <span>{news.categoryName}</span>}
                {news.createdAt && <span>{new Date(news.createdAt).toLocaleDateString('sr-RS')}</span>}
                {news.authorName && <span>{news.authorName}</span>}
            </div>
        </div>
    );
};

export default NewsCard;
