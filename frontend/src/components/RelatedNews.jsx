import { Link } from "react-router-dom";

const RelatedNews = ({ news = [] }) => {
    return (
        <div>
            <h3>Related News</h3>

            {news.map((item) => (
                <div key={item.newsId}>
                    <Link to={`/news/${item.newsId}`}>
                        {item.title}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default RelatedNews;