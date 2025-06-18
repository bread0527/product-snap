import { useState } from "react";

export default function UploadPage() {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 处理文件上传
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // 背景移除函数
  const removeBackground = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image_file", image);
    formData.append("size", "auto");

    try {
      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": "aiKUgnbEQusMCghGNnCq3Ssn", // 替换为你的API密钥
        },
        body: formData,
      });

      const result = await response.blob();
      const url = URL.createObjectURL(result);
      setProcessedImage(url);
    } catch (error) {
      console.error("Error removing background:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
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

        <button
          onClick={removeBackground}
          disabled={loading || !image}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : "Remove Background"}
        </button>

        {processedImage && (
          <div className="mt-4">
            <p className="text-gray-700 mb-2">Processed Image:</p>
            <img
              src={processedImage}
              alt="Processed preview"
              className="w-full rounded-lg border"
            />
          </div>
        )}
      </div>
    </div>
  );
}
