import React from "react";

export default function InfoComponent() {
    return (
        <div className="info-component container">
            <h1>Welcome to the Password Manager</h1>
            <p>
                Use this app to store your passwords for customer accreditations
                securely.
            </p>
            <p>
                <strong>Important:</strong> To keep customer details secure,
                <strong>do not</strong> store these passwords anywhere else or
                share these with anyone who doesn't currently have app access.
            </p>
        </div>
    );
}
