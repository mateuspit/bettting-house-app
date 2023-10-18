import { ApplicationError } from "../protocols";

export function unauthorizedException(): ApplicationError {
    return {
        name: 'UnauthorizedError',
        message: 'Unauthorized!',
    };
}