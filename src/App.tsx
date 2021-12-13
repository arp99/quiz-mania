import { Home, LoginForm, Profile, QuizPlay, RegisterForm } from "./Pages"
import { Routes, Route } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute/PrivateRoute"
import { Results } from "./Pages/Results/Results"
import "./App.css"
import { Navbar } from "./Components"
import { useAppDispatch } from "./app/Hooks/hooks"
import jwt_decode from "jwt-decode"
import { useEffect } from "react"
import { logOutUser } from "./app/Features/Auth/AuthSlice"
import { JwtType } from "./app/Types/Jwt.types"

function App() {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if( token && jwt_decode<JwtType>(token).exp*1000 < Date.now() ){
      dispatch( logOutUser() )
    }
  },[ dispatch ])
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
