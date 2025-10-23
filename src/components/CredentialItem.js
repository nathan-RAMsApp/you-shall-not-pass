import React from "react";

export default function CredentialItem({ credential }) {
    console.log(credential["login-successful"]);
    var credentialStatus = credential["login-successful"]
        ? "success"
        : "failed";

    return (
        <div
            className="credential-item card container"
            onClick={() =>
                (window.location.href = `credential/${credential.id}`)
            }
        >
            <div className="credential-company container">
                <h2>{credential.company}</h2>
            </div>
            <div className="credential-desc container">
                <p className="credential-provider">{credential.provider}</p>
                <div className={`credential-status ${credentialStatus}`}></div>
            </div>
        </div>
    );
}
