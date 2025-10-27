import React, { useState } from "react";
import CredentialForm from "./CredentialForm";

export default function CreateCredential() {
    const [credential, setCredential] = useState({});

    return (
        <div className="create-credential container">
            <h2>Add a new credential</h2>
            <CredentialForm
                method="create"
                credential={credential}
                setCredential={setCredential}
            />
        </div>
    );
}
