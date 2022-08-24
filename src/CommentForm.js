import React, { useState } from 'react';

function CommentForm() {
    const [userId, setUserId] = useState("");
    const [postId, setPostId] = useState("");
    const [comment, setComment] = useState("");

    let handleSubmit = (e) => {
        e.preventDefault();
        try {
            fetch("http://localhost:8080/api/comments", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    postId: postId,
                    comment: comment,
                })
            }).then(res=> {
                return res.json()
            }).then(data => console.log(data))
            .catch(error => console.log("ERROR FETCHING"))
            
        } catch (error) {console.log(error)}
    }

    return (
        <div className="App">
            <h1> Create a new Comment</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userId}
                    placeholder="UserId"
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="text"
                    value={postId}
                    placeholder="PostId"
                    onChange={(e) => setPostId(e.target.value)}
                />
                <input
                    type="text"
                    value={comment}
                    placeholder="Comment"
                    onChange={(e) => setComment(e.target.value)}
                />

                <button type="submit">Create</button>
        
            </form>
        </div>
    );
}

export default CommentForm;