import axios from "axios"
import { API_ENDPOINTS } from "../dataServices/api";

export async function isValidRegistrationCode(code: string): Promise<boolean> {
    let valid = true;
    try {
        const rc = await axios.get(API_ENDPOINTS.registrationCode(code))
    } catch (error) {
        valid = false
    }
    return valid
}
