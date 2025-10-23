import React from "react";

export default function CredentialPage({ credential }) {
    return (
        <div className="credential-item card container">
            <h2>{credential.company}</h2>
            <p className="credential-provider">{credential.provider}</p>
            <div className="credential-details">
                <label for="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={credential.username}
                    disabled
                ></input>
            </div>
        </div>
    );
}
