import { ApplicationError } from "../protocols";

export function notFoundException(): ApplicationError {
    return {
        name: 'NotFoundError',
        message: 'No result for this search!',
    };
}