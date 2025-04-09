import { useState } from "react";
import "./CreateUser.css";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    imagesBase64: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Gagal membuat user");
        return response.json();
      })
      .then((data) => {
        alert("User berhasil dibuat!");
        console.log(data);
        setFormData({
          name: "",
          age: "",
          email: "",
          password: "",
          imagesBase64: "",
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <form onSubmit={handleSubmit} className="create-user-form">
      <h2>Buat Akun User</h2>
      <input
        type="text"
        name="name"
        placeholder="Nama"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Umur"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="imagesBase64"
        placeholder="Base64 Gambar (opsional)"
        value={formData.imagesBase64}
        onChange={handleChange}
      />
      <button type="submit">Buat User</button>
    </form>
  );
}
