import { Component, Input } from '@angular/core';
import { Student } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent {
  @Input()
  student: Student | null = null;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentsService
  ) {}

  ngOnInit(): void {
    // Suscríbete a los cambios en los parámetros de la ruta
    this.route.params.subscribe((params) => {
      // Extrae el valor del parámetro 'id' de la ruta
      const studentId = +params['id']; // Convierte el parámetro a número
      // Usa el servicio para obtener la información del usuario por ID
      this.studentService.getStudentByID$(studentId).subscribe((student) => {
        if (student) {
          this.student = student;
        } else {
          // Manejar el caso en el que el estudiante no se encuentra
          console.error('Estudiante no encontrado');
          // Puedes redirigir a una página de error o realizar alguna otra acción
        }
      });
    });
  }
}
