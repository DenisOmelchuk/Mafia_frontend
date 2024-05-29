import React, { useRef, useImperativeHandle, forwardRef } from "react";

const ProfileModal = forwardRef(({ children }, ref) => {
  const seeFriendsRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => seeFriendsRef.current.showModal(),
    close: () => seeFriendsRef.current.close(),
  }));

  return (
    <dialog ref={seeFriendsRef} className="modal">
      {children}
    </dialog>
  );
});

export default ProfileModal;
