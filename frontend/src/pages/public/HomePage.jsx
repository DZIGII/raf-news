import { useEffect, useState } from "react";
import { getNews } from "../../api/newsApi";
import NewsCard from "../../components/NewsCard";
import Pagination from "../../components/Pagination";

const HomePage = () => {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadNews();
    }, [page]);

    const loadNews = async () => {
        try {
            const res = await getNews(page, 10);
            setNews(res.data.news);
            setTotalPages(Math.ceil(res.data.total / 10));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Najnovije vesti</h1>

            {news.map((item) => (
                <NewsCard
                    key={item.newsId}
                    news={item}
                />
            ))}

            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default HomePage;
