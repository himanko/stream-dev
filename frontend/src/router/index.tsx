import Index from "@/pages";
import { Routes, Route } from "react-router-dom";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Index />} />
  </Routes>
);

export default AppRouter;
