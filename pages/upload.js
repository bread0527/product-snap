// pages/upload.js
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function UploadPage() {
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Head>
        <title>Upload Product Image - ProductSnap</title>
      </Head>
      <div className="min-h-screen px-4 py-6 bg-gray-50">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Upload Product Image</h1>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="mb-4"
          />
          {image && (
            <div className="mt-4">
              <p className="text-gray-700 mb-2">Preview:</p>
              <img
                src={image}
                alt="Uploaded preview"
                className="w-full rounded-lg border"
              />
            </div>
          )}
          <div className="mt-6">
            <Link href="/">
              <button className="text-sm text-blue-600 hover:underline">← Back to home</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
