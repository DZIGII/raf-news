import { useState } from "react";
import { filterNews } from "../../api/newsApi";

const CmsSearchPage = () => {
    const [query, setQuery] =
        useState("");

    const [results, setResults] =
        useState([]);

    const handleSearch = async (
        e
    ) => {
        e.preventDefault();

        try {
            const res =
                await filterNews({
                    q: query
                });

            setResults(
                res.data
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>CMS Search</h1>

            <form
                onSubmit={
                    handleSearch
                }
            >
                <input
                    value={query}
                    onChange={(e) =>
                        setQuery(
                            e.target.value
                        )
                    }
                    placeholder="Search news..."
                />

                <button
                    type="submit"
                >
                    Search
                </button>
            </form>

            <hr />

            {results.map(
                (item) => (
                    <div
                        key={
                            item.newsId
                        }
                    >
                        {
                            item.title
                        }
                    </div>
                )
            )}
        </div>
    );
};

export default CmsSearchPage;