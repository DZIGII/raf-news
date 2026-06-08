import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { filterNews } from "../../api/newsApi";
import Pagination from "../../components/Pagination";

const CmsSearchPage = () => {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [results, setResults] = useState([]);
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
            setResults(res.data.news);
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
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Pretrazi vesti..."
                    style={{ padding: "8px", width: "300px" }}
                />
                <button type="submit" style={{ padding: "8px 15px", marginLeft: "5px" }}>Pretrazi</button>
            </form>

            {searched && results.length === 0 && <p>Nema rezultata za "{query}".</p>}

            {results.length > 0 && (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
                            <th style={{ padding: "10px" }}>Naslov</th>
                            <th style={{ padding: "10px" }}>Autor</th>
                            <th style={{ padding: "10px" }}>Datum</th>
                            <th style={{ padding: "10px" }}>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((item) => (
                            <tr key={item.newsId} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "10px" }}>
                                    <Link to={`/news/${item.newsId}`} target="_blank">
                                        {item.title}
                                    </Link>
                                </td>
                                <td style={{ padding: "10px" }}>{item.authorName}</td>
                                <td style={{ padding: "10px" }}>
                                    {new Date(item.createdAt).toLocaleDateString('sr-RS')}
                                </td>
                                <td style={{ padding: "10px" }}>
                                    <Link to={`/cms/news/edit/${item.newsId}`}>Izmeni</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default CmsSearchPage;
