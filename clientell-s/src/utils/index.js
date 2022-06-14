import { Unauth } from "./errorHandling"
import { toast } from "react-toastify"

export const ErrorHandler = (errorcode) => {
    if (errorcode === 401) {
        //unauthorized
        Unauth();
        // toast.error("You are not authorized to access this page");
    }
} 