import React, { useState } from "react";

function AdminPortal() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    origin: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCoffee = {
      ...formData,
      price: parseFloat(formData.price),
    };

    fetch("http://localhost:3001/coffee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("New coffee added successfully!");
        setFormData({ name: "", description: "", origin: "", price: "" });
      })
      .catch((err) => console.error("Error adding coffee:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Portal - Add New Coffee</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px", gap: "10px" }}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Origin:
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Coffee</button>
      </form>
    </div>
  );
}

export default AdminPortal;
