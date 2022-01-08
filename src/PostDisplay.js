import { PostInput } from "./PostInput";

async function like(post) {
    post.likes++;
    await fetch("https://my-worker.myrickj2002.workers.dev/posts", {
        method: 'POST',
        body: JSON.stringify(post)
    });
    alert("Liked!");
}

async function dislike(post) {
    post.dislikes++;
    await fetch("https://my-worker.myrickj2002.workers.dev/posts", {
        method: 'POST',
        body: JSON.stringify(post)
    });
    alert("Disliked!");
}

export function PostDisplay(props) {
    return <div style={{paddingLeft: props.isComment ? '20px' : '10px'}}>
        <h4>{props.post.username} {props.isComment ? 'commented' : 'posted'} on {(new Date(props.post.dateTime)).toString()}</h4>
        <h3>{props.post.title}</h3>
        <p>{props.post.content}</p>
        {
            !props.isComment && <div> 
                <button type="button" onClick={() => like(props.post)}>Like ({props.post.likes})</button>
                <button type="button" onClick={() => dislike(props.post)}>Dislike ({props.post.dislikes})</button>
                <PostInput comment={true} parent={props.post} />
                {props.post.comments.sort((a, b) => b.dateTime - a.dateTime).map(comment => <PostDisplay post={comment} isComment={true} key={comment.uuid} />)}
            </div>
        }
        <hr />
    </div>
}