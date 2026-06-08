const RelatedNews = ({ news = [] }) => {
    return (
        <div>
            <h3>Read more...</h3>

            {news.map((item) => (
                <div key={item.newsId}>
                    {item.title}
                </div>
            ))}
        </div>
    );
};

export default RelatedNews;