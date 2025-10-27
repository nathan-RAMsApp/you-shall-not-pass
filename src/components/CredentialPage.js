import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router";
import { useNavigate } from "react-router-dom";
import { getFromJSON } from "../utilities/jsonLikeSQL";
import "../styles/credentialPage.css";
import CredentialForm from "./CredentialForm.js";

export default function CredentialPage({
    method = "view",
    credentialState = null,
}) {
    const navigate = useNavigate();
    const { credentialID } = useParams();
    const [credential, setCredential] = useState(null);
    const [editMode, setEditMode] = useState(false);

    // added local input state
    const [successful, setSuccessful] = useState(false);

    //get the details of the credential when the credential ID from teh URL is updated
    useEffect(() => {
        const fetchCredential = async () => {
            const result = await getFromJSON(
                "../DEMO_DATA/CREDENTIALS.json",
                ["id", "company", "provider", "username", "login-successful"],
                parseInt(credentialID),
                "id"
            );
            setCredential(result);
            // initialize local inputs from fetched credential
            setSuccessful(result?.["login-successful"] ?? false);
        };
        fetchCredential();
    }, [credentialID]);

    //While the credential hasn't returned yet, show loading
    if (!credential) return <div>Loading...</div>;

    function toggleEditMode() {
        setEditMode((prev) => !prev);
    }

    function deleteCredential() {
        //should issue a delete request to backend API
        //for now, just navigate back to main page
        console.log("Credential not deleted until backend is connected.");
        navigate("/");
    }

    return (
        <div className="credential-card card container">
            <div className="credential-card-actions container">
                <img
                    src="../images/edit.svg"
                    alt="Edit credential"
                    className="action-btn"
                    onClick={toggleEditMode}
                />
                <img
                    src="../images/delete.svg"
                    alt="Delete credential"
                    className="action-btn"
                    onClick={deleteCredential}
                />
                <Link to="/">
                    <img
                        src="../images/close.svg"
                        alt="Close credential"
                        className="action-btn"
                    />
                </Link>
            </div>

            <h1>{credential.company}</h1>
            <h2 className="credential-provider">{credential.provider}</h2>
            {!successful && (
                <div className="login-failed-warning warning container">
                    <h3>Warning</h3>
                    <p className="error-message">
                        This credential wasn't accepted last time it was used.
                        We may need to collect this from the user again.
                    </p>
                </div>
            )}
            <CredentialForm
                editMode={editMode}
                setEditMode={setEditMode}
                credential={credential}
                setCredential={setCredential}
                method={editMode ? "edit" : "view"}
                successful={successful}
                setSuccessful={setSuccessful}
            />
        </div>
    );
}
