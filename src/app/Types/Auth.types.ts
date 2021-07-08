export type UserSignUpDetails  = {
    firstName : string;
    lastName? : string;
    email : string;
    password : string
}
export type AuthInitialState  = {
    token : string | null;
    authStatus : "idle" | "fulfilled" | "loading" | "error"
    authError : string | null 
}