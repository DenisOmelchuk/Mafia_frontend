import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoPlayer } from "./VideoPlayer";

const APP_ID = "9bf065906c3840959d09d1d9b5cc169e";
const TOKEN =
  "007eJxTYDB6dzZOJb7kOPcd/tpF5b4XmGZml+rUOjLrzVBQuXK7+7UCg2VSmoGZqaWBWbKxhYmBpallioFlimGKZZJpcrKhmWWq/hyRtIZARgZRxb8sjAwQCOIzMiQyMAAAVbsbhQ==";
const CHANNEL = "a";
const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

export const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === "audio") {
      // user.audioTrack.play()
    }
  };
  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    client.join(APP_ID, CHANNEL, TOKEN, null).then((uid) =>
      Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid]).then(
        ([tracks, uid]) => {
          const [audioTrack, videoTrack] = tracks;
          setLocalTracks(tracks);
          setUsers((previousUsers) => [
            ...previousUsers,
            {
              uid,
              videoTrack,
              audioTrack,
            },
          ]);
          client.publish(tracks);
        }
      )
    );
    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
      client.unpublish(localTracks).then(() => client.leave());
    };
  }, []);

  return (
    <>
      <div className="video_players_container">
        <div className="video-grid">
          {users.map((user) => (
            <VideoPlayer key={user.uid} user={user} />
          ))}
        </div>
      </div>
    </>
  );
};
