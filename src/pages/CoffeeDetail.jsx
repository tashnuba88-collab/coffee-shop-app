import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CoffeeDetail() {
  const { id } = useParams();
  const [coffee, setCoffee] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/coffee/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCoffee(data);
        setNewPrice(data.price);
      })
      .catch((err) => console.error("Error fetching coffee details:", err));
  }, [id]);

  const handlePriceUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/coffee/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    })
      .then((res) => res.json())
      .then((updatedCoffee) => {
        setCoffee(updatedCoffee);
        alert("Price updated successfully!");
      })
      .catch((err) => console.error("Error updating price:", err));
  };

  if (!coffee) return <p>Loading coffee details...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{coffee.name}</h2>
      <p><strong>Origin:</strong> {coffee.origin}</p>
      <p><strong>Description:</strong> {coffee.description}</p>
      <p><strong>Price:</strong> ${coffee.price}</p>

      <form onSubmit={handlePriceUpdate} style={{ marginTop: "20px" }}>
        <label>
          Edit Price:{" "}
          <input
            type="number"
            step="0.01"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </label>
        <button type="submit" style={{ marginLeft: "10px" }}>
          Update Price
        </button>
      </form>
    </div>
  );
}

export default CoffeeDetail;
