import { Home, QuizPlay } from "./Pages"
import { Routes, Route } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute/PrivateRoute"
import { Results } from "./Pages/Results/Results"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <PrivateRoute path="/quiz/:quizId" element={<QuizPlay />} />
        <PrivateRoute path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
