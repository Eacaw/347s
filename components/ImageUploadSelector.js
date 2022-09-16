import { collection, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";

export default function ImageUploadSelector({ postRef }) {
  const imagesCollection = collection(postRef, "images");
  const [images] = useCollectionData(imagesCollection);

  const [coverImageSrc, setCoverImageSrc] = useState(null);

  useEffect(() => {
    if (images && images.length > 0) {
      setCoverImageSrc(images[0].src);
    }
  }, [images]);

  useEffect(() => {
    if (coverImageSrc) {
      toast.success("Cover image set!");
      // Update the cover image on the post ref
      updateDoc(postRef, {
        coverImage: coverImageSrc,
      });
    }
  }, [coverImageSrc]);

  // Path is users/user/posts/slug/images, grab the slug here
  const imageAlt = postRef.path.split("/")[3];

  return (
    <div class="static-card">
      <h3>Images:</h3>
      <p>Click on an image to copy the embed code to add to your recipe.</p>
      {images &&
        images.slice(0).map((image, idx) => {
          return image.src ? (
            <div className="thumbnail-card" key={idx}>
              <img
                src={image.src}
                alt={imageAlt}
                className="thumbnail"
                onClick={() => {
                  navigator.clipboard.writeText(`![${imageAlt}](${image.src})`);
                  toast.success("Copied to clipboard!");
                }}
              />
            </div>
          ) : null;
        })}
    </div>
  );
}
