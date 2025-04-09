import { useState } from "react";
import "./CreateProduct.css";

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageBase64: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatRupiah = (value) => {
    const numberString = value.replace(/[^\d]/g, "");
    const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formatted;
  };

  const handlePriceChange = (e) => {
    const formatted = formatRupiah(e.target.value);
    setFormData((prev) => ({
      ...prev,
      price: formatted,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setFormData((prev) => ({
        ...prev,
        imageBase64: base64String,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const priceAsNumber = parseFloat(
      formData.price.replace(/\./g, "").replace(",", ".")
    );

    if (isNaN(priceAsNumber)) {
      alert("Harga tidak valid!");
      return;
    }

    const payload = {
      ...formData,
      price: priceAsNumber,
    };

    fetch("http://localhost:8080/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal menambahkan produk");
        return res.json();
      })
      .then((data) => {
        alert("Produk berhasil ditambahkan!");
        console.log(data);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Tambah Produk</h2>
      <input
        type="text"
        name="name"
        placeholder="Nama Produk"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Deskripsi Produk"
        value={formData.description}
        onChange={handleChange}
        required
      ></textarea>
      <input
        type="text"
        name="price"
        placeholder="Harga (contoh: 500.000)"
        value={formData.price}
        onChange={handlePriceChange}
        required
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Simpan</button>
    </form>
  );
}
