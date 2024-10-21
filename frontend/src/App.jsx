import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { SendMoney } from "./pages/SendMoney";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { Navbar } from "./component/Navbar";
import Toast from "./component/Toast";
import { RecoilRoot, useRecoilValue } from "recoil";
import { toastAtom } from "./store/toast.atom";
import FireIcon from "./component/ngx/icons/FireIcon.svg";

function App() {
  const toastValue = useRecoilValue(toastAtom);
  return (
    <div>
      <Navbar
        logoName={"Paytm Application"}
        navLinkLabels={[
          { label: "Home", link: "/" },
          { label: "SignIn", link: "/signin" },
          { label: "SignUp", link: "/signup" },
          { label: "Send", link: "/send" },
          { label: "Dashboard", link: "/dashboard" },
        ]}
      ></Navbar>

      {toastValue && (
        <Toast
          icon={<FireIcon></FireIcon>}
          message={toastValue}
          showCloseButton={false}
        ></Toast>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="signin" element={<SignIn />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
          <Route path="send" element={<SendMoney />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
