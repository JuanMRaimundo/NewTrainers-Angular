import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectAuthUser).pipe(
    map((user) => {
      if (user?.role !== 'ADMIN') {
        Swal.fire({
          title: 'Error!',
          text: 'No tienes permiso para ingresar a "Usuarios"',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return router.createUrlTree(['/dashboard/home']);
      } else {
        return true;
      }
    })
  );
};
