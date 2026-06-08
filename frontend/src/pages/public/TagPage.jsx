import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsByTag } from "../../api/newsApi";
import NewsCard from "../../components/NewsCard";
import Pagination from "../../components/Pagination";

const TagPage = () => {
    const { id } = useParams();
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [id]);

    useEffect(() => {
        loadData();
    }, [id, page]);

    const loadData = async () => {
        try {
            const res = await getNewsByTag(id, page, 10);
            setNews(res.data.news);
            setTotalPages(Math.ceil(res.data.total / 10));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Vesti po tagu</h1>

            {news.length === 0 && <p>Nema vesti sa ovim tagom.</p>}

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

export default TagPage;
