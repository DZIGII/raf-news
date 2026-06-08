import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    createCategory,
    updateCategory,
    getCategoryById
} from "../../api/categoryApi";

const CategoryFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEdit = !!id;

    const [name, setName] = useState("");
    const [description, setDescription] =
        useState("");

    useEffect(() => {
        if (isEdit) {
            loadCategory();
        }
    }, [id]);

    const loadCategory = async () => {
        try {
            const res =
                await getCategoryById(id);

            setName(res.data.name);
            setDescription(
                res.data.description
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEdit) {
                await updateCategory({
                    categoryId:
                        Number(id),
                    name,
                    description
                });
            } else {
                await createCategory({
                    name,
                    description
                });
            }

            navigate(
                "/cms/categories"
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>
                {isEdit
                    ? "Edit Category"
                    : "Create Category"}
            </h1>

            <form
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
                />

                <br />
                <br />

                <textarea
                    rows={5}
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                />

                <br />
                <br />

                <button type="submit">
                    Save
                </button>
            </form>
        </div>
    );
};

export default CategoryFormPage;