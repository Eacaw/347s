import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import AuthCheck from "../../components/AuthCheck";
import ImageUploader from "../../components/ImageUploader";
import { auth, firestore } from "../../lib/firebase";
import styles from "../../styles/Admin.module.css";

import { useRouter } from "next/router";
import { useState } from "react";

import Link from "next/link";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import ImageUploadSelector from "../../components/ImageUploadSelector";

export default function DashboardPostManager() {
  return (
    <AuthCheck
      fallback={
        <main>
          <Link passHref href="/">
            <button>Home</button>
          </Link>
        </main>
      }
    >
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const uid = auth?.currentUser?.uid;

  const postRef = doc(firestore, "users", uid, "posts", slug);
  const [post] = useDocumentData(postRef);

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>

          <aside
            style={{
              marginTop: "-5rem",
              marginBottom: "10rem",
            }}
          >
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>
              {preview ? "Edit" : "Preview"}
            </button>
            <Link passHref href={`/${post.username}/${post.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
            <ImageUploader postRef={postRef} />
            <ImageUploadSelector postRef={postRef} />
            <DeletePostButton postRef={postRef} />
          </aside>
        </>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    formState,
    reset,
    watch,
  } = useForm({ defaultValues, mode: "onChange" });

  const { isValid, isDirty } = formState;

  const updatePost = async ({ content, published }) => {
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success("Post updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>
        <textarea
          {...register("content", {
            maxLength: { value: 20000, message: "content is too long" },
            minLength: { value: 10, message: "content is too short" },
            required: { value: true, message: "content is required" },
          })}
        ></textarea>

        {errors.content && (
          <p className="text-danger">{errors.content.message}</p>
        )}

        <fieldset>
          <input
            className={styles.checkbox}
            type="checkbox"
            {...register("published")}
          />
          <label>Published</label>
        </fieldset>

        <button
          type="submit"
          className="btn-green"
          disabled={!isDirty || !isValid}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

function DeletePostButton({ postRef }) {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      await deleteDoc(postRef);
      router.push("/dashboard");
      toast("post annihilated ", { icon: "🗑️" });
    }
  };

  return (
    <button className="btn-red" onClick={deletePost}>
      Delete
    </button>
  );
}
