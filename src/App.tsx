import { Home, QuizPlay, Results, Userprofile } from "./Pages"
import { Routes, Route } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute/PrivateRoute"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <PrivateRoute path="/quiz/:quizId" element={<QuizPlay />} />
        <PrivateRoute path="/results" element={<Results />} />
        <PrivateRoute path="/user-profile" element={<Userprofile />} />
      </Routes>
    </div>
  );
}

export default App;
