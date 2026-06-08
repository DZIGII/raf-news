import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { filterNews } from "../../api/newsApi";
import NewsCard from "../../components/NewsCard";
import Pagination from "../../components/Pagination";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        const q = searchParams.get("q");
        if (q) {
            setQuery(q);
            doSearch(q, 1);
        }
    }, [searchParams]);

    const doSearch = async (q, p) => {
        try {
            const res = await filterNews({ q, page: p, limit: 10 });
            setNews(res.data.news);
            setTotalPages(Math.ceil(res.data.total / 10));
            setSearched(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            setPage(1);
            doSearch(query.trim(), 1);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        doSearch(query.trim(), newPage);
    };

    return (
        <div>
            <h1>Pretraga vesti</h1>

            <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Pretrazi..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ padding: "8px", width: "300px" }}
                />
                <button type="submit" style={{ padding: "8px 15px", marginLeft: "5px" }}>
                    Pretrazi
                </button>
            </form>

            {searched && news.length === 0 && <p>Nema rezultata za "{query}".</p>}

            {news.map((item) => (
                <NewsCard key={item.newsId} news={item} />
            ))}

            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default SearchPage;
