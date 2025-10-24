import React from "react";
import { useNavigate } from "react-router";
import "../styles/header.css";

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="App-header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        Password Manager
                    </a>
                    <div className="add-credential container nav-section">
                        <span onClick={() => navigate("/create")}>
                            <img
                                src="../images/add_credential.svg"
                                alt="Add credential"
                                id="add-icon"
                            />
                            Add
                        </span>
                    </div>
                </div>
            </nav>
        </header>
    );
}
