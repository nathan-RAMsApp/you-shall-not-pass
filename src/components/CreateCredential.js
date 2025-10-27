import React, { useState } from "react";
import CredentialForm from "./CredentialForm";

export default function CreateCredential() {
    const [credential, setCredential] = useState({});
    const [successful, setSuccessful] = useState(true);

    return (
        <div className="create-credential container">
            <h2>Add a new credential</h2>
            <CredentialForm
                method="create"
                credential={credential}
                setCredential={setCredential}
                successful={successful}
                setSuccessful={setSuccessful}
                editMode={true}
            />
            {!successful && (
                <div className="warning">
                    <h4>Warning</h4>
                    <p>
                        It's best to only save credentials we know are working.
                    </p>
                </div>
            )}
        </div>
    );
}
