import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import * as rawBody from "raw-body";
import * as express from "express";

export const PlainBody = createParamDecorator(async (_, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<express.Request>();
    if (!req.readable) {
        throw new BadRequestException("Invalid body");
    }
    const body = await rawBody(req);
    const bodyStr = body.toString("utf8").trim();
    return bodyStr;
})
