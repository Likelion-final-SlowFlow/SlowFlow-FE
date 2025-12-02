import { createBroswerRouter } from "react-router-dom";
import App from "../App";
import OnboardingPage from "./pages/Onboarding/OnboardingPage.jsx";
import SignupPage from "./pages/Member/SignupPage.jsx";
import LoginPage from "./pages/Member/LoginPage.jsx";
import HomePage from "../pages/Home/HomePage.jsx";
import ReportPage from "./pages/Report/ReportPage.jsx";
import HistoryPage from "./pages/History/HistoryPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";

const router = createBroswerRouter([
  {
    path: "/",
    element: <App />,
    Children: [
      {
        path: "/onboarding",
        element: <OnboardingPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/report",
        element: <ReportPage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
