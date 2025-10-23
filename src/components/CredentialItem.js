import React from "react";
import { Link } from "react-router";

export default function CredentialItem({ credential }) {
    var credentialStatus = credential["login-successful"]
        ? "success"
        : "failed";

    return (
        <Link to={`/credential/${credential.id}`}>
            <div className="credential-item card container">
                <div className="credential-company container">
                    <h2>{credential.company}</h2>
                </div>
                <div className="credential-desc container">
                    <p className="credential-provider">{credential.provider}</p>
                    <div
                        className={`credential-status ${credentialStatus}`}
                    ></div>
                </div>
            </div>
        </Link>
    );
}
