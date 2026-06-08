const CommentList = ({
    comments,
    onLike,
    onDislike,
}) => {
    return (
        <div>
            {comments.map((comment, index) => (
                <div
                    key={index}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h4>{comment.authorName}</h4>

                    <p>{comment.content}</p>

                    <small>
                        {new Date(
                            comment.createdAt
                        ).toLocaleString()}
                    </small>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "10px",
                        }}
                    >
                        <button
                            onClick={() =>
                                onLike(comment.commentId)
                            }
                        >
                            👍 {comment.like}
                        </button>

                        <button
                            onClick={() =>
                                onDislike(comment.commentId)
                            }
                        >
                            👎 {comment.dislike}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentList;