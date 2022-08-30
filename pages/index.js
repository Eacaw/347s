import PostFeed from "../components/PostFeed";
import Loader from "../components/Loader";
import { firestore, postToJSON } from "../lib/firebase";
import {
  Timestamp,
  query,
  where,
  orderBy,
  limit,
  collectionGroup,
  getDocs,
  startAfter,
  getFirestore,
} from "firebase/firestore";

import { useState } from "react";
import Metatags from "../components/Metatags";

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps() {
  const ref = collectionGroup(firestore, "posts");
  const postsQuery = query(
    ref,
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      last && last.createdAt
        ? typeof last.createdAt === "number"
          ? Timestamp.fromMillis(last.createdAt)
          : last.createdAt
        : null;

    const ref = collectionGroup(firestore, "posts");
    const postsQuery = query(
      ref,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(LIMIT)
    );

    const newPosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <Metatags />

      <div className="card card-info">
        <h2>Welcome to 347s</h2>
        <p>
          347s is a small recipe repository, where you can share your recipes
          with the world. You can also find recipes from other users, give your
          favourite recipes a little heart ❤️ and more! (coming soon)
        </p>
        <p>
          Sign up for an account using either google or facebook to add your own
          recipes and add hearts to other recipes.
        </p>
      </div>

      <PostFeed posts={posts} />

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}

      <Loader show={loading} />

      {postsEnd && "You have reached the end!"}
    </main>
  );
}
