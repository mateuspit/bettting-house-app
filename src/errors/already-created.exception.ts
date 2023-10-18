import { ApplicationError } from "../protocols";

export function alreadyCreatedException(message: string): ApplicationError {
    return {
        name: 'AlreadyCreatedError',
        message
    };
}