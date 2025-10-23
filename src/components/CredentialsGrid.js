import React, { useEffect, useState } from "react";
import CredentialItem from "./CredentialItem";

export default function CredentialsGrid() {
    const [credentials, setCredentials] = useState([]);

    useEffect(() => {
        fetch("../DEMO_DATA/CREDENTIALS.json")
            .then((response) => response.json())
            .then((data) => setCredentials(data));
    }, []);

    return (
        <div className="credentials-grid container">
            {credentials.map((credential) => (
                <CredentialItem key={credential.id} credential={credential} />
            ))}
        </div>
    );
}
