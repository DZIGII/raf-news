import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
    getNewsById,
    getRelatedNews,
    likeNews,
    dislikeNews
} from "../../api/newsApi";

import {
    getCommentsByNews,
    createComment,
    likeComment,
    dislikeComment
} from "../../api/commentApi";

import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";
import RelatedNews from "../../components/RelatedNews";
import Pagination from "../../components/Pagination";

const NewsDetailsPage = () => {
    const { id } = useParams();

    const [news, setNews] = useState(null);
    const [comments, setComments] = useState([]);
    const [relatedNews, setRelatedNews] = useState([]);
    const [commentPage, setCommentPage] = useState(1);
    const [commentTotalPages, setCommentTotalPages] = useState(1);
    const [error, setError] = useState("");

    useEffect(() => {
        loadNews();
        loadRelated();
        setCommentPage(1);
    }, [id]);

    useEffect(() => {
        loadComments();
    }, [id, commentPage]);

    const loadNews = async () => {
        try {
            const res = await getNewsById(id);
            setNews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const loadComments = async () => {
        try {
            const res = await getCommentsByNews(id, commentPage, 10);
            setComments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const loadRelated = async () => {
        try {
            const res = await getRelatedNews(id);
            setRelatedNews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateComment = async (comment) => {
        setError("");
        try {
            await createComment({
                newsId: Number(id),
                ...comment
            });
            loadComments();
        } catch (err) {
            setError(err.response?.data?.error || "Greska pri dodavanju komentara");
        }
    };

    const handleLikeComment = async (commentId) => {
        try {
            await likeComment(commentId);
            loadComments();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDislikeComment = async (commentId) => {
        try {
            await dislikeComment(commentId);
            loadComments();
        } catch (err) {
            console.error(err);
        }
    };

    const handleLikeNews = async () => {
        try {
            await likeNews(id);
            loadNews();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDislikeNews = async () => {
        try {
            await dislikeNews(id);
            loadNews();
        } catch (err) {
            console.error(err);
        }
    };

    if (!news) {
        return <div>Ucitavanje...</div>;
    }

    return (
        <div>
            <h1>{news.title}</h1>

            <div style={{ color: "#666", marginBottom: "15px", display: "flex", gap: "15px" }}>
                <span>{news.createdBy?.firstName} {news.createdBy?.lastName}</span>
                <span>{new Date(news.createdAt).toLocaleDateString('sr-RS')}</span>
                {news.category && <span>{news.category.name}</span>}
            </div>

            {news.images?.map((img, index) => (
                <img
                    key={index}
                    src={`http://localhost:3000${img.imageUrl}`}
                    alt=""
                    style={{
                        width: "100%",
                        maxHeight: "500px",
                        objectFit: "cover",
                        marginBottom: "15px"
                    }}
                />
            ))}

            <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{news.text}</p>

            <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
                <button onClick={handleLikeNews}>
                    👍 {news.like}
                </button>
                <button onClick={handleDislikeNews}>
                    👎 {news.dislike}
                </button>
            </div>

            {news.tags && news.tags.length > 0 && (
                <div style={{ margin: "15px 0" }}>
                    <strong>Tagovi: </strong>
                    {news.tags.map((tag, i) => (
                        <span key={tag.tagId}>
                            <Link to={`/tag/${tag.tagId}`}>{tag.keyword}</Link>
                            {i < news.tags.length - 1 ? ", " : ""}
                        </span>
                    ))}
                </div>
            )}

            <hr />

            <RelatedNews news={relatedNews} />

            <hr />

            <h2>Komentari</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <CommentForm onSubmit={handleCreateComment} />

            <br />

            <CommentList
                comments={comments}
                onLike={handleLikeComment}
                onDislike={handleDislikeComment}
            />

            <Pagination
                page={commentPage}
                totalPages={commentTotalPages}
                onPageChange={setCommentPage}
            />
        </div>
    );
};

export default NewsDetailsPage;
