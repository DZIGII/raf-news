import { useEffect, useState } from "react";
import { getMostReadNews } from "../../api/newsApi";
import NewsCard from "../../components/NewsCard";

const MostReadPage = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await getMostReadNews();
            setNews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Najcitanije vesti</h1>

            {news.length === 0 && <p>Nema podataka.</p>}

            {news.map((item) => (
                <NewsCard
                    key={item.newsId}
                    news={item}
                />
            ))}
        </div>
    );
};

export default MostReadPage;
