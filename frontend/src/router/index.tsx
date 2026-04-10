import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protected-route"; // <-- 1. Import your bouncer
import TutorRoutes from "./tutor-routes"; // <-- 2. Import the tutor routes

import Index from "@/pages/index";
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import ForgotPassword from "@/pages/forgot-password";
import VerifyEmail from "@/pages/auth/verify-email";

// Profile Layout & Pages
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
      {/* Nested Profile Routes - Everything inside here is now secure! */}
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
    </Route>
    {/* Tutor Protected Routes 
        The /* is crucial! It tells React Router to pass routing control down to tutor-routes.tsx*/}
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
