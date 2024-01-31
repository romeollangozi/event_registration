import RegisterPage from "./pages/registerPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserEventsPage from "./pages/userevents.jsx";
import SideBar from "./components/sideBar.jsx";
import HomePage from "./pages/homepage.jsx";
import AttendingEventsPage from "./pages/attendingevents.jsx";
import AdminPage from "./pages/adminPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <SideBar />
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="userevents" element={<UserEventsPage />} />
          <Route path="attendingevents" element={<AttendingEventsPage />} />
          <Route path="sign-up" element={<RegisterPage />} />
          <Route path="sign-in" element={<LoginPage />} />
          <Route path="admindashboard" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
