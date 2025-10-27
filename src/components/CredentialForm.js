import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("********");
    const [company, setCompany] = useState("");
    const [provider, setProvider] = useState("");
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
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        if (editMode) {
            showPassword(credentialID, false);
        } else {
            hidePassword();
        }

        //fetch the password and add to the password box (don't hide)

        const inputElements = document.querySelectorAll(".form-inputs input");

        //enable/disable each field in the form for editing
        inputElements.forEach((element) => {
            if (!element.classList.contains("no-disable")) {
                if (editMode) {
                    element.removeAttribute("disabled");
                } else {
                    element.setAttribute("disabled", true);
                }
            }
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

    async function showPassword(credentialID, autoHide = true) {
        try {
            const data = await getFromJSON(
                "../DEMO_DATA/PASSWORDS.json",
                ["password", "unique_id"],
                parseInt(credentialID),
                "credential_id"
            );
            setPassword(data?.password ?? "");
            if (autoHide) {
                // clear any existing timeout then set a new one
                if (hideTimeoutRef.current) {
                    clearTimeout(hideTimeoutRef.current);
                }
                hideTimeoutRef.current = setTimeout(() => {
                    hidePassword();
                    hideTimeoutRef.current = null;
                }, 5000);
            }
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

    function saveChanges() {
        //should issue a save request to backend API
        //for now, just exit edit mode

        //updating the credential state locally
        //keep this after connecting backend so changes are visible immediately
        //no need to make another fetch
        setCredential((prev) => ({
            ...prev,
            username: username,
            company: company,
            provider: provider,
            // do not update password in credential object for security, password should be sent to the server only.
        }));

        console.log("Changes not saved until backend is connected.");
        if (method === "edit") {
            setEditMode(false);
        } else {
            //ideally navigate to the new credentials page - requires the create request to return the ID
            return navigate("/");
        }
    }

    function cancelEdit() {
        // reset local state to original credential values
        if (
            window.confirm(
                "Are you sure you want to cancel? All changes will be lost."
            ) === true
        ) {
            if (method === "edit") {
                setUsername(credential.username);
                setPassword("********");
                setCompany(credential.company);
                setProvider(credential.provider);
                setSuccessful(credential["login-successful"]);
                setEditMode(false);
            } else if (method === "create") {
                return navigate("/");
            }
        }
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
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!editMode && (
                    <button
                        id="show-password-button"
                        className="btn"
                        /*onClick={(e) => showPassword(credentialID, e)}*/
                        onClick={(e) => {
                            e.preventDefault();
                            showPassword(credentialID);
                        }}
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
                    <button
                        className="btn save-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            saveChanges();
                        }}
                    >
                        Save changes
                    </button>
                    <button
                        className="btn cancel-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            cancelEdit();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </form>
    );
}
