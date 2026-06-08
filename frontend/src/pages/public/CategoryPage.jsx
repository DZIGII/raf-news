import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { filterNews } from "../../api/newsApi";
import { getCategoryById } from "../../api/categoryApi";
import NewsCard from "../../components/NewsCard";
import Pagination from "../../components/Pagination";

const CategoryPage = () => {
    const { id } = useParams();
    const [news, setNews] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setPage(1);
        loadCategory();
    }, [id]);

    useEffect(() => {
        loadData();
    }, [id, page]);

    const loadCategory = async () => {
        try {
            const res = await getCategoryById(id);
            setCategoryName(res.data.name);
        } catch (err) {
            console.error(err);
        }
    };

    const loadData = async () => {
        try {
            const res = await filterNews({
                categoryId: id,
                page,
                limit: 10
            });
            setNews(res.data.news);
            setTotalPages(Math.ceil(res.data.total / 10));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>{categoryName || "Kategorija"}</h1>

            {news.length === 0 && <p>Nema vesti u ovoj kategoriji.</p>}

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

export default CategoryPage;
