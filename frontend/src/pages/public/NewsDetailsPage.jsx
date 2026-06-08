import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getNewsById,
    getRelatedNews
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

const NewsDetailsPage = () => {
    const { id } = useParams();

    const [news, setNews] = useState(null);
    const [comments, setComments] = useState([]);
    const [relatedNews, setRelatedNews] = useState([]);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            const [
                newsRes,
                commentsRes,
                relatedRes
            ] = await Promise.all([
                getNewsById(id),
                getCommentsByNews(id),
                getRelatedNews(id)
            ]);

            setNews(newsRes.data);
            setComments(commentsRes.data);
            setRelatedNews(relatedRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateComment = async (
        comment
    ) => {
        try {
            await createComment({
                newsId: Number(id),
                ...comment
            });

            loadData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleLike = async (
        commentId
    ) => {
        try {
            await likeComment(commentId);
            loadData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDislike = async (
        commentId
    ) => {
        try {
            await dislikeComment(commentId);
            loadData();
        } catch (err) {
            console.error(err);
        }
    };

    if (!news) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{news.title}</h1>

            {news.images?.map((img, index) => (
                <img
                    key={index}
                    src={img.imageUrl}
                    alt=""
                    style={{
                        width: "100%",
                        marginBottom: "15px"
                    }}
                />
            ))}

            <p>{news.text}</p>

            <hr />

            <h2>Comments</h2>

            <CommentForm
                onSubmit={
                    handleCreateComment
                }
            />

            <br />

            <CommentList
                comments={comments}
                onLike={handleLike}
                onDislike={handleDislike}
            />

            <hr />

            <RelatedNews
                news={relatedNews}
            />
        </div>
    );
};

export default NewsDetailsPage;