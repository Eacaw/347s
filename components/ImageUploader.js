import { useEffect, useState } from "react";
import { auth, storage, STATE_CHANGED } from "../lib/firebase";
import Loader from "./Loader";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

// Uploads images to Firebase Storage
export default function ImageUploader({ postRef }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  // Add a reference to the uploaded file on the post document's images collection
  useEffect(() => {
    if (downloadURL) {
      const imageCollectionRef = collection(postRef, "images");
      addDoc(imageCollectionRef, { src: downloadURL });
      // Reset the upload state
      setDownloadURL(null);
    }
  }, [downloadURL]);

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split("/")[1];

    // Makes reference to the storage bucket location
    const uid = auth?.currentUser?.uid;
    const fileRef = ref(storage, `uploads/${uid}/${Date.now()}.${extension}`);
    setUploading(true);

    // Starts the upload
    const task = uploadBytesResumable(fileRef, file);

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(pct);
    });

    // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
    task
      .then(() => getDownloadURL(fileRef))
      .then((url) => {
        setDownloadURL(url);
        setUploading(false);
      });
  };

  return (
    <div className="btn">
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <label className="btn-blue">
            📸 Upload Img
            <input
              type="file"
              onChange={uploadFile}
              accept="image/png,image/gif,image/jpeg"
            />
          </label>
        </>
      )}
    </div>
  );
}
