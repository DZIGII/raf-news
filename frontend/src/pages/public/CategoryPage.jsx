import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { filterNews } from "../../api/newsApi";
import NewsCard from "../../components/NewsCard";

const CategoryPage = () => {
    const { id } = useParams();

    const [news, setNews] = useState([]);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            const res = await filterNews({
                categoryId: id
            });

            setNews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Category</h1>

            {news.map((item) => (
                <NewsCard
                    key={item.newsId}
                    news={item}
                />
            ))}
        </div>
    );
};

export default CategoryPage;