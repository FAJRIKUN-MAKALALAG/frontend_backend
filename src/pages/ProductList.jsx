import { useEffect, useState } from "react";
import "./ProductList.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch("http://localhost:8080/product")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Gagal fetch produk !!:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;

    fetch(`http://localhost:8080/product/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal menghapus produk");
        // update list
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="product-list">
      <h2>Daftar Produk</h2>
      {products.length === 0 ? (
        <p>Belum ada produk</p>
      ) : (
        <div className="product-cards">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              {product.imageBase64 && (
                <img
                  src={`data:image/jpeg;base64,${product.imageBase64}`}
                  alt={product.name}
                  className="product-image"
                />
              )}
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Harga: Rp {product.price.toLocaleString("id-ID")}</p>
              <button
                onClick={() => handleDelete(product.id)}
                className="delete-button"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
