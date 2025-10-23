import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import CredentialsContext from "../context/CredentialsContext";
import { getFromJSON } from "../utilities/jsonLikeSQL";
import "../styles/credentialPage.css";

export default function CredentialPage() {
    const { credentialID } = useParams();
    const [credential, setCredential] = useState(null);

    useEffect(() => {
        const fetchCredential = async () => {
            const result = await getFromJSON(
                "../DEMO_DATA/CREDENTIALS.json",
                ["id", "company", "provider", "username"],
                parseInt(credentialID)
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
                <button id="show-password-button" className="btn">
                    Show password
                </button>
            </div>
        </div>
    );
}
