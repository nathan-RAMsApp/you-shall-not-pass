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
            <p>
                <strong>&#9432; Want to add a password in CRM? </strong>
                <br />
                Don't add the password itself, instead, copy the password's page
                and paste <i>that</i> into CRM.
                <br />
                Anyone who clicks the link can use it to view that password.
            </p>
        </div>
    );
}
