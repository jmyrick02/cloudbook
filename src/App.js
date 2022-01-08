import { useEffect, useState } from 'react';
import { PostDisplay } from './PostDisplay';
import { PostInput } from './PostInput';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("https://my-worker.myrickj2002.workers.dev/posts");
      let json = await response.json();
      setPosts(json.map(e => JSON.parse(e)));
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Cloudbook</h1>
      <PostInput comment={false} />
      {posts.length > 0 && posts.sort((a, b) => b.dateTime - a.dateTime).map(post => <PostDisplay key={post.uuid} post={post} isComment={false} />)}
    </div>
  );
}

export default App;