import { useState, useEffect } from "react";
import "./App.css";
import fetch from "unfetch";
import ReactPlayer from "react-player/youtube";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function App() {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    fetch("/api/youtube-feed")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setFeed(data.feed);
      });
  }, []);

  if (!feed) return <h1>Loading...</h1>;

  return (
    <div className="container">
      <h1>
        <a href={feed.link} rel="noreferrer" target="_blank" title={feed.title}>
          {feed.title}
        </a>
      </h1>
      {feed.items.map((item) => (
        <div key={item.id} className="video-box">
          <div className="video-title">
            <h2>{item.title}</h2>
            <p>
              Published{" "}
              {formatDistanceToNow(new Date(item.pubDate), { addSuffix: true })}
            </p>
          </div>
          <div className="player-wrapper">
            <ReactPlayer
              width="100%"
              height="100%"
              className="video-player"
              url={item.link}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
