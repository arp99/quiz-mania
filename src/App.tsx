import { Home, QuizPlay } from "./Pages"
import { Routes, Route } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute/PrivateRoute"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <PrivateRoute path="/quiz/:quizId" element={<QuizPlay />} />
      </Routes>
    </div>
  );
}

export default App;
