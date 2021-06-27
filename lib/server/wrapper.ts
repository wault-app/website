import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import WrapperError from "./error";

/**
 * A wrapper function for API endpoints for easier developement
 * @param endpoint An async function to handle necessary calculations
 * @returns The data to be sent to the user
 */
const wrapper = <T = {}>(endpoint: (req: NextApiRequest, res?: NextApiResponse) => Promise<T>) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            try {
                const resp = await endpoint(req, res);
                res.json(resp);
            } catch(e) {
                if (e instanceof WrapperError) throw e;
                else if(e instanceof TokenExpiredError) throw new WrapperError("jwt_token_expired");
                else if (e instanceof JsonWebTokenError) throw new WrapperError("jwt_token_invalid");
                else {
                    console.error(e);
                    throw new WrapperError("unexcepted_error");
                }
            }
        } catch(e) {
            console.log(e);

            res.json({
                error: true,
                message: e.message,
                data: e.data,
            });
        }
    };
};

export default wrapper;