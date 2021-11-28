import { Home, LoginForm, Profile, QuizPlay, RegisterForm } from "./Pages"
import { Routes, Route } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute/PrivateRoute"
import { Results } from "./Pages/Results/Results"
import "./App.css"
import { Navbar } from "./Components"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <PrivateRoute path="/quiz/:quizId" element={<QuizPlay />} />
        <PrivateRoute path="/profile" element={<Profile />} />
        <PrivateRoute path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
