import { Component, Input } from '@angular/core';
import { User } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  @Input()
  user: User | null = null;
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    // Suscríbete a los cambios en los parámetros de la ruta
    this.route.params.subscribe((params) => {
      // Extrae el valor del parámetro 'id' de la ruta
      const userId = +params['id']; // Convierte el parámetro a número
      // Usa el servicio para obtener la información del usuario por ID
      this.userService.getUserByID$(userId).subscribe((user) => {
        if (user) {
          this.user = user;
        } else {
        }
      });
    });
  }
}
