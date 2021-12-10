import { User } from "../../generated/graphql";
import { AuthTenantUserResponseDto } from "./auth-tenant-user-response.dto";

export class CurrentUser {

    authenticated:boolean;

    user?:AuthTenantUserResponseDto;

    constructor(authenticated:boolean, user?:AuthTenantUserResponseDto) {
        this.user = user;
        this.authenticated = authenticated;
        if (authenticated)
            console.log("User is authenticated");
    }

    getRole():string {
        if (!this.user)
            throw new Error("User not initialized. Is it authenticated?");
        return this.user.role;
    }

    /**
     * Returns current email domain
     */
    getDomain():string {
        if (!this.user)
            throw new Error("User not initialized. Is it authenticated?");
        return this.user.username.split("@")[1];
    }

    /** Checks if a User from Graphql lists is the same as this current user */
    isSameUser(user:User): boolean {
        if (!this.user)
            throw new Error("User not initialized. Is it authenticated?");
        return this.user.id === user.id;
    }

    hasRole(roles:string[]): boolean {
        return roles.includes(this.getRole());
    }

    hasNotRole(roles:string[]): boolean {
        return !this.hasRole(roles);
    }
}