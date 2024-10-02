import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import AuthMiddleware from "./components/AuthMiddleware";
import { UIchatBot } from './components/UIchatBot'

function App() {
  return (
    <Router>
      <Loader />
      <Routes>
        {/* Public route */}
        <Route path="/" element={<HomePage />} />

        {/* Protected route for users */}
        <Route 
          path="/chat-bot"
          element={
            <AuthMiddleware requiredRole="user">
              <>
                <UIchatBot />
              </>
            </AuthMiddleware>
          }
        />

        {/* Protected route for admins */}
        <Route
          path="/virtual-assistant"
          element={
            <AuthMiddleware requiredRole="admin">
              <>
                <Leva hidden />
                <UI />
                <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
                  <Experience />
                </Canvas>
              </>
            </AuthMiddleware>
          }
        />

        {/* Redirect users to chat-bot if they try to access virtual-assistant */}
        <Route 
          path="/virtual-assistant"
          element={
            <AuthMiddleware requiredRole="user">
              <Navigate to="/chat-bot" replace />
            </AuthMiddleware>
          }
        />

        {/* Fallback route for any unmatched paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;