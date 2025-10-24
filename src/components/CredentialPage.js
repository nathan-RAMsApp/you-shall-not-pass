import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getFromJSON } from "../utilities/jsonLikeSQL";
import "../styles/credentialPage.css";

export default function CredentialPage() {
    const { credentialID } = useParams();
    const [credential, setCredential] = useState(null);
    const [editMode, setEditMode] = useState(false);

    // added local input state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("********");

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
            setUsername(result?.username ?? "");
            setPassword("********");
        };
        fetchCredential();
    }, [credentialID]);

    if (!credential) return <div>Loading...</div>;

    function toggleEditMode() {
        showPassword(credentialID, false).then(setEditMode(!editMode));
    }

    function cancelEdit() {
        // reset local state to original credential values
        setUsername(credential.username);
        setPassword("********");
        setEditMode(false);
    }

    // moved inside component so it can set password state
    async function showPassword(credentialID, autoHide = true) {
        try {
            const data = await getFromJSON(
                "../DEMO_DATA/PASSWORDS.json",
                ["password", "unique_id"],
                parseInt(credentialID),
                "credential_id"
            );
            setPassword(data?.password ?? "");
            if (autoHide) {
                setTimeout(hidePassword, 5000);
            }
        } catch (e) {
            // handle error (do not log sensitive data)
            console.error("Failed to fetch password");
        }
    }

    function hidePassword() {
        setPassword("********");
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
            {!credential["login-successful"] && (
                <div className="login-failed-warning warning container">
                    <h3>Warning</h3>
                    <p className="error-message">
                        This credential wasn't accepted last time it was used.
                        We may need to collect this from the user again.
                    </p>
                </div>
            )}

            <div className="credential-details">
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
            </div>
            {editMode && (
                <div className="credential-edit-actions container">
                    <button className="btn save-btn">Save changes</button>
                    <button className="btn cancel-btn" onClick={cancelEdit}>
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}
