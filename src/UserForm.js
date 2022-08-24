import React, { useState} from 'react';



function UserForm() {
    const [firstNameToPost, setFirstName] = useState("");
    const [lastNameToPost, setLastName] = useState("");
    const [passwordToPost, setPassword] = useState("");

    let handleSubmit = (e) => {
        e.preventDefault();
        try {
            fetch("http://localhost:8080/api/users/", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: firstNameToPost,
                    lastName: lastNameToPost,
                    password: passwordToPost,
                })
            }).then(res=> {
                return res.json()
            }).then(data => console.log(data))
            .catch(error => console.log("ERROR FETCHING"))
            
        } catch (error1) {console.log(error1)}
    }

    return (
        <div className="App">
            <h1> Create a new User</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={firstNameToPost}
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    value={lastNameToPost}
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="text"
                    value={passwordToPost}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Create</button>
        
            </form>
        </div>
    );
}

export default UserForm;