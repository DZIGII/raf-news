import { useEffect, useState } from "react";
import { getNews } from "../../api/newsApi";
import NewsCard from "../../components/NewsCard";
import Pagination from "../../components/Pagination";

const HomePage = () => {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadNews();
    }, [page]);

    const loadNews = async () => {
        try {
            const res = await getNews(page);

            setNews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Latest News</h1>

            {news.map((item) => (
                <NewsCard
                    key={item.newsId}
                    news={item}
                />
            ))}

            <Pagination
                page={page}
                totalPages={999}
                onPageChange={setPage}
            />
        </div>
    );
};

export default HomePage;