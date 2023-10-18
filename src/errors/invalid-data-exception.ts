import { ApplicationError } from "../protocols";

export function invalidDataException(details: string[]): ApplicationInvalidateDataError {
    return {
        name: "InvalidDataError",
        message: "Invalid data",
        details,
    };
}

type ApplicationInvalidateDataError = ApplicationError & {
    details: string[];
};