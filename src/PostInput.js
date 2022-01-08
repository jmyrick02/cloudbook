import { useState } from "react";

async function post(title, username, content) {
    await fetch("https://my-worker.myrickj2002.workers.dev/posts", {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            username: username,
            content: content,
            dateTime: Date.now(),
            likes: 0,
            dislikes: 0,
            comments: [],
        })
    });
    alert("Posted!");
}

async function comment(parent, title, username, content) {
    parent.comments.push({
        title: title,
        username: username,
        content: content,
        dateTime: Date.now(),
        likes: 0,
        dislikes: 0,
        uuid: crypto.randomUUID(),
        comments: [],
    });
    await fetch("https://my-worker.myrickj2002.workers.dev/posts", {
        method: 'POST',
        body: JSON.stringify(parent)
    });
    alert("Commented!");
}

export function PostInput(props) {
    const [username, setUsername] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return <form style={{paddingLeft: '10px'}}>
        <label htmlFor="username">Display Name:</label><input id="username" onChange={(event) => setUsername(event.target.value)} />
        <label htmlFor="title">{props.comment ? 'Comment' : 'Post'} Title:</label><input id="title" onChange={(event) => setTitle(event.target.value)} />
        <label htmlFor="content">{props.comment ? 'Comment' : 'Post'}:</label><input id="content" onChange={(event) => setContent(event.target.value)} />
        <button type="button" onClick={() => props.comment ? comment(props.parent, title, username, content) : post(title, username, content)}>Submit</button>
        {
            !props.comment && <div>
                <p>Refresh to view updated posts (there may be a delay)</p>
                <hr />
            </div>
        }
    </form>
}