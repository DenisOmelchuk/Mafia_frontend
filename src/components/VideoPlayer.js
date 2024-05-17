import React, { useEffect, useRef } from "react";

export const VideoPlayer = ({ user }) => {
  const ref = useRef();
  const uid = user.uid;

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div>
      <div ref={ref} className="video_player_13p">
        <span className="video_player_username">{user.uid}</span>
      </div>
    </div>
  );
};
