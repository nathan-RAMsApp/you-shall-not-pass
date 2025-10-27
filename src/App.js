import Header from "./components/Header";
import CredentialsGrid from "./components/CredentialsGrid";
import InfoComponent from "./components/InfoComponent";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import CredentialPage from "./components/CredentialPage";
import CredentialsContext from "./context/CredentialsContext";
import CreateCredential from "./components/CreateCredential";

function App() {
    return (
        <Router>
            <Header />
            <CredentialsContext.Provider value={[]}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/credential/:credentialID"
                        element={<CredentialPage />}
                    />
                    <Route
                        path="/create"
                        element={<CreateCredential />}
                    ></Route>
                </Routes>
            </CredentialsContext.Provider>
        </Router>
    );
}

//setup page route functions
function Home() {
    return (
        <div>
            <main>
                <div className="container">
                    <InfoComponent />
                    <CredentialsGrid />
                </div>
            </main>
        </div>
    );
}

export default App;
