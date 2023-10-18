import { ApplicationError } from "../protocols";

export function noContentException(message: string): ApplicationError {
    return {
        name: "NoContentError",
        message
    }
}