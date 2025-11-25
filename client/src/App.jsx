import { Routes, Route } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import SignIn from "./components/SignIn";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./pages/HomePage";
import OauthTest from "./pages/OauthTest";
import SetPassword from "./components/SetPassword";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import Orders from "./components/Orders";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/products/category/:categoryName"
            element={<ProductsPage />}
          />
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Route>

        {/* Auth Routes (No header/footer) */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/create-password" element={<SetPassword />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
