import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Shop() {
  const [coffees, setCoffees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/coffee")
      .then((res) => res.json())
      .then((data) => setCoffees(data))
      .catch((err) => console.error("Error fetching coffee:", err));
  }, []);

  const filteredCoffees = coffees.filter((coffee) =>
    coffee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Shop</h1>
      <input
        type="text"
        placeholder="Search coffee..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="coffee-list">
        {filteredCoffees.map((coffee) => (
          <div key={coffee.id} className="coffee-card">
            <Link to={`/shop/${coffee.id}`}>
              <h3>{coffee.name}</h3>
            </Link>
            <p>{coffee.description}</p>
            <p>Origin: {coffee.origin}</p>
            <p>Price: ${coffee.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
