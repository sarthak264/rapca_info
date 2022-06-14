import React from "react";
import { toast } from "react-toastify";
// import { useHistory, Redirect } from "react-router-dom";

export const Unauth = () => {
    document.location.href = "/login";
};
