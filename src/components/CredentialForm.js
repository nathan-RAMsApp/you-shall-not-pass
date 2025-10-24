import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../styles/credentialForm.css";

export default function CredentialForm({
    credential = {
        name: "",
        company: "",
        provider: "",
    },
    method = "view",
}) {
    const navigate = useNavigate();

    //set editing or reading mode
    //create and edit will use the same mode, just the import behaviour and save behaviours will differ but form contents will remain
    const [editMode, setEditMode] = useState(false);
    function toggleEditMode() {
        setEditMode(!editMode);
    }

    useEffect(() => {
        const inputElements = document.querySelectorAll(".form-inputs input");

        inputElements.forEach((element) => {
            if (editMode) {
                element.removeAttribute("disabled");
            } else {
                element.setAttribute("disabled", true);
            }
            console.log(element);
        });
        console.log("editMode updated");
    }, [editMode]);

    if (!["view", "create"].includes(method)) {
        console.log(`Form has no method: ${method}`);
        alert(
            `Form has no method: ${method}\nContact support and let them know the action you were trying to complete when you saw this message.`
        );
        navigate("/");
    }

    //console.log(method);

    return (
        <form id="credential-form" className={`credential-form mode-${method}`}>
            <div className="form-inputs container">
                {editMode && (
                    <>
                        <label type="text" htmlFor="company">
                            Company:
                        </label>
                        <input
                            id="credential-company"
                            type="text"
                            name="company"
                            //onChange={(e) => setCompany(e.target.value)}
                        />
                        <label type="text" htmlFor="provider">
                            Provider:
                        </label>
                        <input
                            id="credential-provider"
                            type="text"
                            name="provider"
                            //onChange={(e) => setCompany(e.target.value)}
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
                    //onChange={(e) => setCompany(e.target.value)}
                />
                <label type="text" htmlFor="password">
                    Password:
                </label>
                <input
                    id="credential-password"
                    type="text"
                    name="password"
                    //onChange={(e) => setCompany(e.target.value)}
                />
                {!editMode && (
                    <button
                        id="show-password-button"
                        className="btn"
                        /*onClick={() => showPassword(credentialID)}*/
                    >
                        Show password
                    </button>
                )}
                <label type="text" htmlFor="successful">
                    Successful?
                </label>
                <input type="checkbox" name="successful" />
            </div>
            {editMode && (
                <div className="credential-edit-actions container">
                    <button className="btn save-btn" /*onClick={saveChanges}*/>
                        Save changes
                    </button>
                    <button className="btn cancel-btn" /*onClick={cancelEdit}*/>
                        Cancel
                    </button>
                </div>
            )}
        </form>
    );
}
