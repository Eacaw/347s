import Image from "next/image";

export default function UserProfile({ user }) {
  return (
    <div className="box-center">
      <img
        src={user?.photoURL || null}
        width={150}
        height={150}
        objectFit="cover"
        className="card-img-center"
        referrerPolicy="no-referrer"
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || "Anonymous User"}</h1>
    </div>
  );
}
