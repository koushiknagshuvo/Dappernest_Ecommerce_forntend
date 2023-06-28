import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoute from "./components/Routes/AdminRoute";
import PrivateRoute from "./components/Routes/Private";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminOrders from "./pages/Admin/AdminOrders";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Users from "./pages/Admin/Users";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CartPage from "./pages/CartPage";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";
import Dashboard from "./pages/user/Dashboard";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Shop from "./pages/Shop";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UpdateCategory from "./pages/Admin/UpdateCategory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          <Route path="/shop" element={<Shop />} />{" "}
          <Route path="/about" element={<About />} />{" "}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />{" "}
          <Route path="/product/:slug" element={<ProductDetails />} />{" "}
          <Route path="/categories" element={<Categories />} />{" "}
          <Route path="/cart" element={<CartPage />} />{" "}
          <Route path="/category/:slug" element={<CategoryProduct />} />{" "}
          <Route path="/search" element={<Search />} />{" "}
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />{" "}
            <Route path="user/orders" element={<Orders />} />{" "}
            <Route path="user/profile" element={<Profile />} />{" "}
          </Route>{" "}
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />{" "}
            <Route path="admin/create-category" element={<CreateCategory />} />{" "}
            <Route
              path="admin/update-category/:slug"
              element={<UpdateCategory />}
            />{" "}
            <Route path="admin/create-product" element={<CreateProduct />} />{" "}
            <Route path="admin/product/:slug" element={<UpdateProduct />} />{" "}
            <Route path="admin/products" element={<Products />} />{" "}
            <Route path="admin/users" element={<Users />} />{" "}
            <Route path="admin/orders" element={<AdminOrders />} />{" "}
          </Route>{" "}
          <Route path="/register" element={<Register />} />{" "}
          <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
          <Route path="/login" element={<Login />} />{" "}
          <Route path="*" element={<Pagenotfound />} />{" "}
        </Routes>{" "}
        <Footer />
      </BrowserRouter>{" "}
    </>
  );
}

export default App;
