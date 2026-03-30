import { Routes, Route, Navigate } from "react-router-dom";

import Index from "@/pages/index";
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import ForgotPassword from "@/pages/forgot-password";

// Profile Layout & Pages
import Profile from "@/pages/profile";
import PersonalInfo from "@/pages/personal-info";
import SecurityAndSignIn from "@/pages/security-and-sign-in";
import Courses from "@/pages/courses";
import Certificates from "@/pages/certificates";
import PaymentAndSubscription from "@/pages/payment-and-subscription";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    {/* Nested Profile Routes */}
    <Route path="/profile" element={<Profile />}>
      {/* If someone goes exactly to /profile, redirect them to personal-info */}
      <Route index element={<Navigate to="personal-info" replace />} />

      {/* These render inside the <Outlet /> in profile.tsx */}
      <Route path="personal-info" element={<PersonalInfo />} />
      <Route path="security" element={<SecurityAndSignIn />} />
      <Route path="courses" element={<Courses />} />
      <Route path="certificates" element={<Certificates />} />
      <Route path="billing" element={<PaymentAndSubscription />} />
    </Route>
  </Routes>
);

export default AppRouter;
