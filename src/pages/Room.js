import { useState } from "react";
import { VideoRoom } from "../components/VideoRoom";

export default function Room() {
  const [joined, setJoined] = useState(false);
  return (
    <>
      {!joined && (
        <button className="my-20" onClick={() => setJoined(true)}>
          Join
        </button>
      )}

      {joined && <VideoRoom />}
    </>
  );
}
