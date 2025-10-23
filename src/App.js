import Header from "./components/Header";
import CredentialsGrid from "./components/CredentialsGrid";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <div className="container">
                    <h1>Welcome!</h1>
                    <CredentialsGrid />
                </div>
            </main>
        </div>
    );
}

export default App;
