import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Navigation, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuardService {
  public constructor(private router: Router) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const navigation: Navigation = this.router.getCurrentNavigation() as Navigation;
    const data = navigation.extras.state;
    if (data) {
      return this.checkLogin(data.role);
    }

    return false;
  }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  public checkLogin(role: string): boolean {

    if (role === "ADMIN") {
      return true;
    }
    // Navigate to the login page with extras
    this.router.navigate(["/login"]);

    return false;
  }
}
