import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { tap } from "rxjs";

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);

    return authService.isAuthenticated$.pipe(
        tap((isAuthenticated) => {
            if (!isAuthenticated) {
                authService.loginWithRedirect();
            }
        })
    )
}