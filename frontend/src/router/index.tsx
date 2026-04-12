import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import TutorRoutes from "./tutor-routes";

import Index from "@/pages/index";
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import ForgotPassword from "@/pages/forgot-password";
import VerifyEmail from "@/pages/auth/verify-email";
import Welcome from "@/pages/auth/welcome";

import Profile from "@/pages/profile";
import PersonalInfo from "@/pages/personal-info";
import SecurityAndSignIn from "@/pages/security-and-sign-in";
import Courses from "@/pages/courses";
import Certificates from "@/pages/certificates";
import PaymentAndSubscription from "@/pages/payment-and-subscription";

const AppRouter = () => (
  <Routes>
    {/* 🟢 PUBLIC ROUTES */}
    <Route path="/" element={<Index />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/verify-email" element={<VerifyEmail />} />

    {/* 🔴 PROTECTED ROUTES */}
    <Route element={<ProtectedRoute />}>
      {/* ⬇️ FIX: Welcome is now secure! The user must be logged in to see it. */}
      <Route path="/welcome" element={<Welcome />} />

      {/* Nested Profile Routes */}
      <Route path="/profile" element={<Profile />}>
        <Route index element={<Navigate to="personal-info" replace />} />
        <Route path="personal-info" element={<PersonalInfo />} />
        <Route path="security" element={<SecurityAndSignIn />} />
        <Route path="courses" element={<Courses />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="billing" element={<PaymentAndSubscription />} />
      </Route>
    </Route>

    {/* Tutor Protected Routes */}
    <Route
      path="/tutor/*"
      element={
        <ProtectedRoute allowedRoles={["TUTOR", "ADMIN"]}>
          <TutorRoutes />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRouter;
