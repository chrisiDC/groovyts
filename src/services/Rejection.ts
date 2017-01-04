export class Rejection {
    public static NOTFOUND: number = 1;
    public static INVALIDPARAMETERS: number = 2;
    public static DENIED: number = 3;
    public static NOTAUTHENTICATED: number = 4;
    public static ERROR: number = 5;
    public static NOTIMPLEMENTED: number = 6;

    public Code: number = 0;
    public Message: string = null;

    static NotFound(msg?: string): Rejection {
        let rejection = new Rejection();
        rejection.Code = Rejection.NOTFOUND;
        rejection.Message = msg;

        return rejection;
    }

    static InvalidParameters(msg?: string): Rejection {
        let rejection = new Rejection();
        rejection.Code = Rejection.INVALIDPARAMETERS;
        rejection.Message = msg;

        return rejection;
    }

    static Denied(msg?: string): Rejection {
        let rejection = new Rejection();
        rejection.Code = Rejection.DENIED;
        rejection.Message = msg;

        return rejection;
    }

    static NotAuthenticated(msg?: string): Rejection {
        let rejection = new Rejection();
        rejection.Code = Rejection.NOTAUTHENTICATED;
        rejection.Message = msg;

        return rejection;
    }

    static Error(o: any): Rejection {
        let rejection = new Rejection();
        rejection.Code = Rejection.ERROR;

        let msg:string;

        if (o instanceof Error) msg = o.stack;
        else msg = JSON.stringify(o);

        rejection.Message = msg;

        return rejection;
    }

    static NotImplemented(msg?: string): Rejection {
        let rejection = new Rejection();
        rejection.Code = Rejection.NOTIMPLEMENTED;
        rejection.Message = msg;

        return rejection;
    }


}