import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import CreateProduct from "./pages/CreateProduct";
import ProductList from "./pages/ProductList";
import UserList from "./pages/UserList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>mantap</h1>
        <nav>
          <ul>
            <li>
              <Link to="/create-user">Create User</Link>
            </li>
            <li>
              <Link to="/user-list">User List</Link>
            </li>
            <li>
              <Link to="/create-product">Create Product</Link>
            </li>
            <li>
              <Link to="/product-list">Product List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/product-list" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
