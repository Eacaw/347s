import Link from "next/link";

export default function PostFeed({ posts, admin = false }) {
  return posts && posts.length ? (
    <div className="grid">
      {posts.map((post, i) => (
        <PostItem post={post} key={i} admin={admin} />
      ))}
    </div>
  ) : (
    <></>
  );
}

function PostItem({ post, admin }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  // Return a simple card showcasing all post
  // data
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-dummy"></div>
        <a
          className="card-img"
          style={{
            backgroundImage: `url(${
              post?.coverImage ? post?.coverImage : "/ComingSoon.png"
            })`,
          }}
          href={`/${post.username}/${post.slug}`}
        ></a>
      </div>
      <div className="card-body">
        <Link href={`/${post.username}/${post.slug}`}>
          <h2>
            <a>{post.title}</a>
          </h2>
        </Link>
        <Link href={`/${post.username}`}>
          <a>
            <strong>By @{post.username}</strong>
          </a>
        </Link>
      </div>
      <p>
        {wordCount} words. {minutesToRead} min read
      </p>
      <br />
      <span className="push-center">❤️ {post.heartCount || 0} Hearts</span>
      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link passHref href={`/dashboard/${post.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>

          {post.published ? (
            <p className="text-success">Live</p>
          ) : (
            <p className="text-danger">Unpublished</p>
          )}
        </>
      )}
    </div>
  );
}
