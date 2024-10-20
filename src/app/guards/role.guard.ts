import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      // Vérifier si le rôle de l'utilisateur est autorisé pour cette route
      const expectedRole = route.data['role'];
      if (role === expectedRole) {
        return true;
      } else {
        // Rediriger vers la page de connexion si le rôle ne correspond pas
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      this.router.navigate(['/login']);
      return false;
    }
  }
}
