import React, { useState } from "react";
import CredentialForm from "./CredentialForm";
import "../styles/createCredential.css";

export default function CreateCredential() {
    const [credential, setCredential] = useState({});
    const [successful, setSuccessful] = useState(true);

    return (
        <div className="create-credential container">
            <div className="info-container container">
                <h2>Add a new credential</h2>
                <p>
                    Fill in all the details in the form below to save a new
                    credential.
                </p>
                <p>
                    Make sure the credential isn't saved elsewhere in CRM, if it
                    is be sure to delete these once this saved.
                </p>
            </div>
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
