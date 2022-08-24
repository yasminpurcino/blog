import React, { useState, useContext } from 'react';
import { Context } from './context/Context'


function PostForm() {
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [likes, setLikes] = useState("");
    const { allUserId } = useContext(Context)

    let handleSubmit = (e) => {
        e.preventDefault();
        try {
             fetch("http://localhost:8080/api/posts", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    title: title,
                    description: description,
                    image: image,
                    likes: likes
                })
            }).then(res => {
                return res.json()
            }).then(data => console.log(data))
                .catch(error => console.log("ERROR FETCHING"))

        } catch (error) { console.log(error) }
    }
    console.log(allUserId)
    return (
        <div className="App">
            <h1> Create a new Post</h1>
            <datalist id = "userDatalist">
                {allUserId.map(user => <option key={user} value = {user}> {user} </option>)}
            </datalist>
            {/* <datalist id="userData">
                {allUserId.map(function (item) {
                    <option value={item}/> })}
            </datalist> */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    list="userDatalist"
                    value={userId}
                    placeholder="UserId"
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="text"
                    value={title}
                    placeholder="PostId"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    value={description}
                    placeholder="Comment"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    value={image}
                    placeholder="image url"
                    onChange={(e) => setImage(e.target.value)}
                />
                <input
                    type="text"
                    value={likes}
                    placeholder="number of likes"
                    onChange={(e) => setLikes(e.target.value)}
                />

                <button type="submit">Create</button>

            </form>
        </div>
    );
}

export default PostForm;