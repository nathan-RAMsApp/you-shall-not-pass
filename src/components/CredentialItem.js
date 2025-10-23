import React from "react";

export default function CredentialItem({ credential }) {
    return (
        <div className="credential-item card container">
            <h2>{credential.company}</h2>
            <p className="credential-provider">{credential.provider}</p>
        </div>
    );
}
