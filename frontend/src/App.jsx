import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setMessage("Nem sikerült betölteni a termékeket."));
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId,
          quantity: 1
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("A termék bekerült a kosárba.");
      } else {
        setMessage(data.error || "Hiba történt.");
      }
    } catch {
      setMessage("Szerverhiba történt.");
    }
  };

  return (
    <div className="container">
      <h1>Webshop</h1>
      <p className="info">{message}</p>

      <div className="product-grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>{product.price} Ft</strong></p>
            <button onClick={() => addToCart(product.id)}>Kosárba</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;