import "./index.scss";
import Home from "./routes/home/home-component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation-component";
import Authentication from "./routes/auth/authentication.component";
import Shop from "./routes/shop/shop-route";
import Checkout from "./routes/checkout/checkout.route";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        {/* <Route path="/shop" element={<Shop />} /> */}
      </Routes>
    </div>
  );
};

export default App;
