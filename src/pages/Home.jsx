import React, { useState, useEffect } from "react";

function Home() {
  const [storeInfo, setStoreInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/store_info")
      .then((res) => res.json())
      .then((data) => {
        const info = Array.isArray(data) ? data[0] : data;
        setStoreInfo(info);
      })
      .catch((err) => console.error("Error fetching store info:", err));
  }, []);

  if (!storeInfo) return <p>Loading store information...</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>{storeInfo.name}</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "20px auto" }}>
        {storeInfo.description}
      </p>
      <p><strong>Phone:</strong> {storeInfo.phone_number}</p>
    </div>
  );
}

export default Home;

