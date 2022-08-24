import './App.css';
import AllUsers from './AllUsers';
import UserForm from './UserForm.js';
import AllComments from './AllComments';
import AllPosts from './AllPosts';
import CommentForm from './CommentForm';
import PostForm from './PostForm';

function App() {
  return (
    <div className="App">
        <UserForm/>
        <PostForm/>
        <AllUsers/>
        <AllPosts/>
        <CommentForm/>
        <AllComments/>
    </div>
  );
}

export default App;
