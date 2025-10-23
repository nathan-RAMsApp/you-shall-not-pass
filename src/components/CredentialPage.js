import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getFromJSON } from "../utilities/jsonLikeSQL";
import "../styles/credentialPage.css";

export default function CredentialPage() {
    const { credentialID } = useParams();
    const [credential, setCredential] = useState(null);

    useEffect(() => {
        const fetchCredential = async () => {
            const result = await getFromJSON(
                "../DEMO_DATA/CREDENTIALS.json",
                ["id", "company", "provider", "username", "login-successful"],
                parseInt(credentialID),
                "id"
            );
            setCredential(result);
        };
        fetchCredential();
    }, [credentialID]);

    if (!credential) return <div>Loading...</div>;

    return (
        <div className="credential-card card container">
            <Link to="/">
                <img
                    src="../images/close.svg"
                    alt="Close credential"
                    className="close-btn"
                />
            </Link>

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
                    type="text"
                    name="username"
                    value={credential.username}
                    disabled
                ></input>
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    id="credential-password"
                    type="text"
                    name="password"
                    value="********"
                    disabled
                ></input>
                <button
                    id="show-password-button"
                    className="btn"
                    onClick={() => showPassword(credentialID)}
                >
                    Show password
                </button>
            </div>
        </div>
    );
}

async function showPassword(credentialID) {
    const passwordField = document.getElementById("credential-password");

    const password = await getFromJSON(
        "../DEMO_DATA/PASSWORDS.json",
        ["password", "unique_id"],
        parseInt(credentialID),
        "credential_id"
    ).then((data) => (passwordField.value = data.password));

    setTimeout(hidePassword, 5000);
}

async function hidePassword() {
    const passwordField = document.getElementById("credential-password");

    passwordField.value = "********";
}
