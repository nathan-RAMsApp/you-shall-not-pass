import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import CredentialsContext from "../context/CredentialsContext";
import { getFromJSON } from "../utilities/jsonLikeSQL";

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
            <h2>{credential.company}</h2>
            <p className="credential-provider">{credential.provider}</p>
            <div className="credential-details">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={credential.username}
                    disabled
                ></input>
                <label htmlFor="password">Password:</label>
                <input
                    id="credential-password"
                    type="text"
                    name="password"
                    value="********"
                    disabled
                ></input>
            </div>
        </div>
    );
}
