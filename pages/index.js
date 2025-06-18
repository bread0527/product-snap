import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-4">Upload Product Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="mb-4"
      />
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="max-w-xs rounded shadow"
        />
      )}
    </div>
  );
}
