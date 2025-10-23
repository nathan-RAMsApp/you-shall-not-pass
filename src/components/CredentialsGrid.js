import React, { useEffect, useState } from "react";
import CredentialItem from "./CredentialItem";

export default function CredentialsGrid() {
    const [credentials, setCredentials] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("../DEMO_DATA/CREDENTIALS.json")
            .then((response) => response.json())
            .then((data) => setCredentials(data));
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const searchedCredentials = credentials.filter(
        (credential) =>
            credential.company
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            credential.provider.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="credentials-grid container">
            <div className="container credentials-search">
                <input
                    type="search"
                    className="search-input"
                    placeholder="Search credentials..."
                    onInput={handleSearch}
                    value={searchTerm}
                />
            </div>
            {searchedCredentials.map((credential) => (
                <CredentialItem key={credential.id} credential={credential} />
            ))}
        </div>
    );
}
