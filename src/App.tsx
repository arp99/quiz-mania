import { Home, LoginForm, QuizPlay, RegisterForm } from "./Pages"
import { Routes, Route } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute/PrivateRoute"
import { Results } from "./Pages/Results/Results"
import "./App.css"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <PrivateRoute path="/quiz/:quizId" element={<QuizPlay />} />
        <PrivateRoute path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
