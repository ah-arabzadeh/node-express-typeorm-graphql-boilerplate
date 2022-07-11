export const CUSTOM_MSG = {
    UnknownInternalError: {
        code: 0,
        txt: "Unknown Internal Server Error: Please contact system administrator"
    },
    CoreAuth: {
        code: 0,
        Error_OnVerifyToken: { code: 0, txt: "Error on verify token" },
        Error_TokenExpired: { code: 0, txt: "Token was expired, Login again" },
        Error_OnMakeRefreshedToken: { code: 0, txt: "Can not make `refreshedToken`" },
        Error_AccessDenied: { code: 0, txt: "Access Denied" }
    },
    Database: {
        code: 0,
        Error_OnInsert: { code: 0, txt: "Error while inserting record in database" },
        Error_OnUpdate: { code: 0, txt: "Error while updating record in database" },
        Error_OnDelete: { code: 0, txt: "Error while deleting record from database" },
        Error_OnSelect: { code: 0, txt: "Error while fetching record from database" },
    },
    LoginRoute: {
        code: 0,
        Msg_Welcome: "Welcome",
        Error_InputIsInvalid: { code: 0, txt: "Input is invalid" },
        Error_UserNotFound: { code: 0, txt: "User not found" },
        //internal server error
        ErrorOnFetchUser: { code: 0, txt: "Internal Server Error: Can not fetch `user` from database" },
        ErrorOnMakeingToken: { code: 0, txt: "Internal Server Error: Can not make `token`" }
    },
    ValidateInput: {
        code: 0,
        Msg_Length: "Min length is:" + " `$constraint1` " + ", Max length is:" + " `$constraint2`",
    }
};