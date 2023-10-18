import { invalidDataException } from "../errors/index";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;

function validate(schema: ObjectSchema, type: "body" | "params") {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[type], {
            abortEarly: false,
        });

        if (!error) {
            next();
        } else {
            res.status(httpStatus.BAD_REQUEST).send(invalidDataException(error.details.map((d) => d.message)));
        }
    };
}

export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
    return validate(schema, "body");
}