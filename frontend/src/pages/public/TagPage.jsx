import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsByTag } from "../../api/newsApi";
import NewsCard from "../../components/NewsCard";

const TagPage = () => {
    const { id } = useParams();

    const [news, setNews] = useState([]);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            const res = await getNewsByTag(id);

            setNews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Tag News</h1>

            {news.map((item) => (
                <NewsCard
                    key={item.newsId}
                    news={item}
                />
            ))}
        </div>
    );
};

export default TagPage;