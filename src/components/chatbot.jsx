import React, { useState } from "react";

function Chatbot() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    // Assuming Ollama is running locally on port 11434
    fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3", // or whatever model you have pulled in Ollama (e.g., "mistral", "llama2")
        prompt: prompt,
        stream: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.response);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error connecting to Ollama:", err);
        setResponse("Error: Could not connect to Ollama. Make sure it is running locally!");
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Coffee Shop AI Assistant</h2>
      <form onSubmit={handleChatSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <textarea
          rows="3"
          placeholder="Ask the barista anything about coffee..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: "20px", padding: "15px", background: "#f4f4f4", borderRadius: "5px" }}>
          <strong>AI Barista:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Chatbot;