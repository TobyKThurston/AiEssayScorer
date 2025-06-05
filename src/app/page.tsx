'use client';

import { useState } from "react";

export default function Home() {
  const [essay, setEssay] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult("");

    const response = await fetch("/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ essay }),
    });

    const data = await response.json();
    setResult(data); // store full result object
    setLoading(false);
  };

  return (
    <main className="p-8 max-w-2xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">AI Essay Scorer</h1>

      <textarea
        className="w-full h-64 border p-4 rounded text-black"
        placeholder="Paste your college essay here..."
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Essay
      </button>

      {loading && <p className="mt-4">Scoring essay...</p>}

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded text-black">
          <h2 className="font-bold mb-2">Essay Analysis:</h2>
          <p><strong>Structure:</strong> {result.structure}</p>
          <p><strong>Clarity:</strong> {result.clarity}</p>
          <p><strong>Creativity:</strong> {result.creativity}</p>
          <p><strong>Tone:</strong> {result.tone}</p>
          <p><strong>Overall:</strong> {result.overall}</p>

          <h2 className="font-bold mt-4">Feedback:</h2>
          <p>{result.feedback}</p>
        </div>
      )}
    </main>
  );
}



