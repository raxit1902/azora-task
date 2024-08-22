import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { loginUserSuccess } from "./actions/authActions";
import Layout from "./components/Layout";
import SignIn from "./components/SignIn";
import SignupForm from "./components/SignupForm";
import ContactList from "./components/ContactList";
import CreateContact from "./components/CreateContact";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const userData = { token };
      dispatch(loginUserSuccess(userData));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <Layout>
                <ContactList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts/new"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateContact />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
