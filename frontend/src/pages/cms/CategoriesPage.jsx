import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getCategories,
    deleteCategory
} from "../../api/categoryApi";

const CategoriesPage = () => {
    const [categories, setCategories] =
        useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const res =
            await getCategories();

        setCategories(res.data);
    };

    const handleDelete = async (
        id
    ) => {
        try {
            await deleteCategory(id);
            loadCategories();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Categories</h1>

            <Link to="/cms/categories/new">
                Add Category
            </Link>

            <hr />

            {categories.map((cat) => (
                <div
                    key={cat.categoryId}
                >
                    <span>
                        {cat.name}
                    </span>

                    <Link
                        to={`/cms/categories/edit/${cat.categoryId}`}
                    >
                        Edit
                    </Link>

                    <button
                        onClick={() =>
                            handleDelete(
                                cat.categoryId
                            )
                        }
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CategoriesPage;