import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    createNews,
    updateNews,
    getNewsById
} from "../../api/newsApi";

const NewsFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEdit = !!id;

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [tags, setTags] = useState("");
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (isEdit) {
            loadNews();
        }
    }, [id]);

    const loadNews = async () => {
        const res = await getNewsById(id);

        setTitle(res.data.title);
        setText(res.data.text);

        setTags(
            res.data.tags
                ?.map((t) => t.keyword)
                .join(", ")
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append(
                "title",
                title
            );

            formData.append(
                "text",
                text
            );

            const parsedTags = tags
                .split(",")
                .map((tag) => ({
                    keyword: tag.trim()
                }));

            formData.append(
                "tags",
                JSON.stringify(parsedTags)
            );

            for (
                let i = 0;
                i < images.length;
                i++
            ) {
                formData.append(
                    "images",
                    images[i]
                );
            }

            if (isEdit) {
                await updateNews(
                    id,
                    formData
                );
            } else {
                await createNews(
                    formData
                );
            }

            navigate("/cms/news");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>
                {isEdit
                    ? "Edit News"
                    : "Create News"}
            </h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(
                            e.target.value
                        )
                    }
                />

                <br />
                <br />

                <textarea
                    rows={10}
                    placeholder="Text"
                    value={text}
                    onChange={(e) =>
                        setText(
                            e.target.value
                        )
                    }
                />

                <br />
                <br />

                <input
                    type="text"
                    placeholder="tag1, tag2"
                    value={tags}
                    onChange={(e) =>
                        setTags(
                            e.target.value
                        )
                    }
                />

                <br />
                <br />

                <input
                    type="file"
                    multiple
                    onChange={(e) =>
                        setImages(
                            e.target.files
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

export default NewsFormPage;