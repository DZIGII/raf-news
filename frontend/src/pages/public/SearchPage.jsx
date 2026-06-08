import { useState } from "react";
import { filterNews } from "../../api/newsApi";
import NewsCard from "../../components/NewsCard";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [news, setNews] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const res = await filterNews({
                q: query
            });

            setNews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Search News</h1>

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) =>
                        setQuery(e.target.value)
                    }
                />

                <button type="submit">
                    Search
                </button>
            </form>

            <br />

            {news.map((item) => (
                <NewsCard
                    key={item.newsId}
                    news={item}
                />
            ))}
        </div>
    );
};

export default SearchPage;