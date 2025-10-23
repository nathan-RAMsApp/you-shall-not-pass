import Header from "./components/Header";
import CredentialsGrid from "./components/CredentialsGrid";
import InfoComponent from "./components/InfoComponent";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
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
