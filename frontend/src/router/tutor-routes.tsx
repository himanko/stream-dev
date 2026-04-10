import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// 1. The Layout Shell (Always loaded immediately)
import TutorLayout from "@/components/layout/tutor-layout";

// 2. Lazy Loaded Services (Downloaded only when the tutor clicks the link)
const ConsoleHome = lazy(() => import("@/pages/tutor/dashboard/consolehome"));

// Compute / Workloads
const CourseList = lazy(() => import("@/pages/tutor/courses/course-list"));
const CourseEditor = lazy(
  () => import("@/pages/tutor/courses/curriculum-editor"),
);

// Storage / Media
const MediaLibrary = lazy(() => import("@/pages/tutor/media/media-library"));

// IAM / Students
const StudentAudit = lazy(() => import("@/pages/tutor/students/student-audit"));
const EnrollmentDetails = lazy(
  () => import("@/pages/tutor/students/enrollment-details"),
);

// CloudWatch / Analytics
const Performance = lazy(() => import("@/pages/tutor/analytics/performance"));
const WatchTimeChart = lazy(
  () => import("@/pages/tutor/analytics/watchtimechart"),
);

// Billing
const Payouts = lazy(() => import("@/pages/tutor/billing/payouts"));

// 3. Loading Fallback Component
const PageSkeleton = () => (
  <div className="h-[80vh] w-full flex flex-col items-center justify-center text-zinc-400 gap-3">
    <Loader2 className="h-8 w-8 animate-spin text-[#ff9900]" />
    <p className="text-sm font-medium">Loading Service...</p>
  </div>
);

export default function TutorRoutes() {
  return (
    <Routes>
      {/* The TutorLayout acts as the "Shell" (Sidebar + Top Nav). 
        Everything inside the <Route> below will render inside the Layout's <Outlet /> 
      */}
      <Route element={<TutorLayout />}>
        {/* Default Landing Page */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <ConsoleHome />
            </Suspense>
          }
        />

        {/* --- COURSES (Compute) --- */}
        <Route
          path="courses"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <CourseList />
            </Suspense>
          }
        />
        <Route
          path="courses/:courseId/edit"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <CourseEditor />
            </Suspense>
          }
        />

        {/* --- MEDIA (Storage) --- */}
        <Route
          path="media"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <MediaLibrary />
            </Suspense>
          }
        />

        {/* --- STUDENTS (IAM) --- */}
        <Route
          path="students"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <StudentAudit />
            </Suspense>
          }
        />
        <Route
          path="students/:studentId"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <EnrollmentDetails />
            </Suspense>
          }
        />

        {/* --- ANALYTICS (CloudWatch) --- */}
        <Route
          path="analytics/performance"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Performance />
            </Suspense>
          }
        />
        <Route
          path="analytics/watch-time"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <WatchTimeChart />
            </Suspense>
          }
        />

        {/* --- BILLING --- */}
        <Route
          path="billing/payouts"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Payouts />
            </Suspense>
          }
        />

        {/* Fallback for unknown /tutor/* routes */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
}
