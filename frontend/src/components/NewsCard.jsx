import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
            }}
        >
            {news.mainImage && (
                <img
                    src={news.mainImage}
                    alt={news.title}
                    style={{
                        width: "100%",
                        maxHeight: "250px",
                        objectFit: "cover",
                    }}
                />
            )}

            <h3>{news.title}</h3>

            <Link to={`/news/${news.newsId}`}>
                Read more
            </Link>
        </div>
    );
};

export default NewsCard;