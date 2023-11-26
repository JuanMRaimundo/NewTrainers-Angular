import { Component, Input } from '@angular/core';
import { Course } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../courses.service';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss'],
})
export class CoursesDetailComponent {
  @Input()
  course: Course | null = null;
  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService
  ) {}

  ngOnInit(): void {
    // Suscríbete a los cambios en los parámetros de la ruta
    this.route.params.subscribe((params) => {
      // Extrae el valor del parámetro 'id' de la ruta
      const userId = +params['id']; // Convierte el parámetro a número
      // Usa el servicio para obtener la información del usuario por ID
      this.courseService.getCourseByID$(userId).subscribe((course) => {
        if (course) {
          this.course = course;
        } else {
        }
      });
    });
  }
}
