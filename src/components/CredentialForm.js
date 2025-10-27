import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { getFromJSON } from "../utilities/jsonLikeSQL";
import "../styles/credentialForm.css";

export default function CredentialForm({
    credential = null,
    setCredential,
    method = "view",
    editMode = false,
    setEditMode,
    successful = false,
    setSuccessful,
}) {
    const navigate = useNavigate();
    const { credentialID } = useParams();
    //const [credential, setCredential] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("********");
    const [company, setCompany] = useState("");
    const [provider, setProvider] = useState("");
    //const [successful, setSuccessful] = useState(false);
    const hideTimeoutRef = useRef(null); // changed: track any hidePassword timeout

    //set editing or reading mode
    //create and edit will use the same mode, just the import behaviour and save behaviours will differ but form contents will remain
    //commentign out unused functions to ensure working app before deleting
    //console.log(parentEditMode);
    //const [editMode, setEditMode] = useState(parentEditMode);
    /*function toggleEditMode() {
        setEditMode(!editMode);
    }*/

    //get the details of the credential when the credential ID from teh URL is updated
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
            setCompany(result?.company ?? "");
            setProvider(result?.provider ?? "");
            setSuccessful(result?.["login-successful"] ?? false);
        };
        fetchCredential();
    }, [credentialID]);

    //disable or re-enable the fields in teh form if edit mode is enabled/disabled
    useEffect(() => {
        const inputElements = document.querySelectorAll(".form-inputs input");

        inputElements.forEach((element) => {
            if (!element.classList.contains("no-disable")) {
                if (editMode) {
                    element.removeAttribute("disabled");
                } else {
                    element.setAttribute("disabled", true);
                }
            }
            console.log(element);
        });
        console.log("editMode toggled");
    }, [editMode]);

    //check if the form has been created with a supported method, if not display an error and direct to home
    if (method !== "view" && method !== "create" && method !== "edit") {
        console.log(`Form has no method: ${method}`);
        alert(
            `Form has no method: ${method}\nContact support and let them know the action you were trying to complete when you saw this message.`
        );
        navigate("/");
    }

    /*function toggleEditMode() {
        // cancel any pending auto-hide timeout before toggling edit mode
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        // call showPassword and toggle edit mode after it resolves
        showPassword(credentialID, false).then(() =>
            setEditMode((prev) => !prev)
        );
    }*/

    async function showPassword(credentialID, autoHide = true) {
        try {
            const data = await getFromJSON(
                "../DEMO_DATA/PASSWORDS.json",
                ["password", "unique_id"],
                parseInt(credentialID),
                "credential_id"
            );
            setPassword(data?.password ?? "");
            /*if (autoHide) {
                // clear any existing timeout then set a new one
                if (hideTimeoutRef.current) {
                    clearTimeout(hideTimeoutRef.current);
                }
                hideTimeoutRef.current = setTimeout(() => {
                    hidePassword();
                    hideTimeoutRef.current = null;
                }, 5000);
            }*/
        } catch (e) {
            // handle error (do not log sensitive data)
            console.error("Failed to fetch password");
        }
    }

    function hidePassword() {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        setPassword("********");
    }

    function cancelEdit() {
        // reset local state to original credential values
        setUsername(credential.username);
        setPassword("********");
        setCompany(credential.company);
        setProvider(credential.provider);
        setSuccessful(credential["login-successful"]);
        setEditMode(false);
    }

    return (
        <form id="credential-form" className={`credential-form mode-${method}`}>
            {/*All input elements are disabled unless edit mode is enabled to allow viewing but not editing */}
            <div className="form-inputs container">
                {/*Hide the Company and Provider fields unless edit mode is enabled*/}
                {editMode && (
                    <>
                        <label type="text" htmlFor="company">
                            Company:
                        </label>
                        <input
                            id="credential-company"
                            type="text"
                            name="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        <label type="text" htmlFor="provider">
                            Provider:
                        </label>
                        <input
                            id="credential-provider"
                            type="text"
                            name="provider"
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                        />
                    </>
                )}

                <label type="text" htmlFor="username">
                    Username:
                </label>
                <input
                    id="credential-username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label type="text" htmlFor="password">
                    Password:
                </label>
                <input
                    id="credential-password"
                    type="text"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.checked)}
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
                {/*Successful checkbox should be available all the time to prevent needing to edit to make changes*/}
                <label type="text" htmlFor="successful">
                    Successful?
                </label>
                <input
                    type="checkbox"
                    name="successful"
                    className="no-disable"
                    value={successful}
                    onChange={(e) => setSuccessful(e.target.checked)}
                />
            </div>
            {editMode && (
                <div className="credential-edit-actions container">
                    <button className="btn save-btn" /*onClick={saveChanges}*/>
                        Save changes
                    </button>
                    <button className="btn cancel-btn" onClick={cancelEdit}>
                        Cancel
                    </button>
                </div>
            )}
        </form>
    );
}
