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
    /*const [username, setUsername] = useState("");
    const [password, setPassword] = useState("********");
    const [company, setCompany] = useState("");
    const [provider, setProvider] = useState("");*/
    const [successful, setSuccessful] = useState(false);

    const hideTimeoutRef = useRef(null); // changed: track any hidePassword timeout

    //get the details of the credential when the credential ID from teh URL is updated
    /*useEffect(() => {
        const fetchCredential = async () => {
            const result = await getFromJSON(
                "../DEMO_DATA/CREDENTIALS.json",
                ["id", "company", "provider", "username", "login-successful"],
                parseInt(credentialID),
                "id"
            );
            setCredential(result);
            // initialize local inputs from fetched credential
            setUsername(result?.username ?? "");
            setPassword("********");
            setCompany(result?.company ?? "");
            setProvider(result?.provider ?? "");
            setSuccessful(result?.["login-successful"] ?? false);
        };
        fetchCredential();
    }, [credentialID]);*/

    //While the credential hasn't returned yet, show loading
    if (!credential) return <div>Loading...</div>;

    function toggleEditMode() {
        // cancel any pending auto-hide timeout before toggling edit mode
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        // call showPassword and toggle edit mode after it resolves
        /*showPassword(credentialID, false).then(() =>
            setEditMode((prev) => !prev)
        );*/
    }

    /*function cancelEdit() {
        // reset local state to original credential values
        setUsername(credential.username);
        setPassword("********");
        setCompany(credential.company);
        setProvider(credential.provider);
        setSuccessful(credential["login-successful"]);
        setEditMode(false);
    }*/

    /*function saveChanges() {
        //should issue a save request to backend API
        //for now, just exit edit mode

        //updating the credential state locally
        //keep this after connecting backend so changes are visible immediately
        //no need to make another fetch
        setCredential((prev) => ({
            ...prev,
            username: username,
            company: company,
            provider: provider,
            // do not update password in credential object for security, password should be sent to the server only.
        }));
        console.log("Changes not saved until backend is connected.");
        setEditMode(false);
    }*/

    function deleteCredential() {
        //should issue a delete request to backend API
        //for now, just navigate back to main page
        console.log("Credential not deleted until backend is connected.");
        navigate("/");
    }

    // moved inside component so it can set password state
    /*async function showPassword(credentialID, autoHide = true) {
        try {
            const data = await getFromJSON(
                "../DEMO_DATA/PASSWORDS.json",
                ["password", "unique_id"],
                parseInt(credentialID),
                "credential_id"
            );
            setPassword(data?.password ?? "");
            if (autoHide) {
                // clear any existing timeout then set a new one
                if (hideTimeoutRef.current) {
                    clearTimeout(hideTimeoutRef.current);
                }
                hideTimeoutRef.current = setTimeout(() => {
                    hidePassword();
                    hideTimeoutRef.current = null;
                }, 5000);
            }
        } catch (e) {
            // handle error (do not log sensitive data)
            console.error("Failed to fetch password");
        }
    }

    function hidePassword() {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        setPassword("********");
    }*/

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
            <h2>-----</h2>
            {/*
            <div className="credential-details">
                {editMode && (
                    <>
                        <label type="text" htmlFor="company">
                            Company:
                        </label>
                        <input
                            id="credential-company"
                            type="text"
                            name="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        <label type="text" htmlFor="provider">
                            Provider:
                        </label>
                        <input
                            id="credential-provider"
                            type="text"
                            name="provider"
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                        />
                    </>
                )}
                <label htmlFor="username">Username:</label>
                <input
                    id="credential-username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={!editMode}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    id="credential-password"
                    type="text"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!editMode}
                />
                {!editMode && (
                    <button
                        id="show-password-button"
                        className="btn"
                        onClick={() => showPassword(credentialID)}
                    >
                        Show password
                    </button>
                )}
                <label type="text" htmlFor="successful">
                    Successful?
                </label>
                <input
                    type="checkbox"
                    name="successful"
                    checked={successful}
                    onChange={(e) => setSuccessful(e.target.checked)}
                    disabled={!editMode}
                />
            </div>
            {editMode && (
                <div className="credential-edit-actions container">
                    <button className="btn save-btn" onClick={saveChanges}>
                        Save changes
                    </button>
                    <button className="btn cancel-btn" onClick={cancelEdit}>
                        Cancel
                    </button>
                </div>
            )}*/}
        </div>
    );
}
