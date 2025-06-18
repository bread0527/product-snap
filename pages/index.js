import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [processedUrl, setProcessedUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
    setProcessedUrl(null); // 清除之前结果图
    setPreviewUrl(URL.createObjectURL(uploadedFile));
  };

  const removeBackground = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    try {
      const res = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": "aiKUgnbEQusMCghGNnCq3Ssn", // 替换为你的 remove.bg API 密钥
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Background removal failed");

      const blob = await res.blob();
      const resultUrl = URL.createObjectURL(blob);
      setProcessedUrl(resultUrl);
    } catch (err) {
      console.error(err);
      alert("背景移除失败，请检查 API Key 或图片格式");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Upload Product Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {previewUrl && (
        <div className="mb-4">
          <p className="font-semibold">原图预览：</p>
          <img src={previewUrl} alt="Original" className="max-w-xs rounded shadow" />
        </div>
      )}
      {file && (
        <button
          onClick={removeBackground}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Removing..." : "Remove Background"}
        </button>
      )}
      {processedUrl && (
        <div className="mt-6">
          <p className="font-semibold">背景移除结果：</p>
          <img src={processedUrl} alt="Processed" className="max-w-xs rounded shadow" />
        </div>
      )}
    </div>
  );
}
