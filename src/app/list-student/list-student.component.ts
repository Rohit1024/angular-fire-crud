import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Student } from '../shared/student';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css'],
})
export class ListStudentComponent implements OnInit {
  Students!: Student[];
  student: any;
  constructor(private service: StudentService) {}

  ngOnInit(): void {
    this.service
      .getStudentList().snapshotChanges()
      .pipe(
        map((changes: any) =>
          changes.map(
            (student: any) => ({
              id: student.payload.doc.id,
              ...student.payload.doc.data(),
            })
          )
        )
      )
      .subscribe((data) => {
        this.Students = data;
      });
  }

  log(id: any) {
    console.log(id);
  }

  removeStudent(student: Student): void {
    if (
      confirm('Are you sure you want to remove ' + student.name + ' from DB ?')
    ) {
      this.service.deleteStudent(student.id);
    }
  }
}
