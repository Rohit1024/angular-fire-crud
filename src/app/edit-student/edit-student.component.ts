import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../shared/student';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  editForm!: FormGroup;
  studentRef: any;
  courses = ["Science", "Commerce", "Arts", "Literature", "Medical"];
  constructor(
    private fb: FormBuilder,
    private service: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date_of_birth: ['', Validators.required],
      course: ['', Validators.required],
      fees: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.service.getStudentDoc(id!).subscribe((res) => {
      this.studentRef = res;
      console.log(this.studentRef);
      this.editForm = this.fb.group({
        name: [this.studentRef.name],
        email: [this.studentRef.email],
        date_of_birth: [this.studentRef.date_of_birth],
        course: [this.studentRef.course],
        fees: [this.studentRef.fees],
      });
    });
  }
  
  back(): void {
    this.router.navigate(['list-student']);
  }

  get form(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  onSubmit(){
    const id = this.route.snapshot.paramMap.get('id');

    this.service.updateStudent(this.editForm.value as Student, id!);
    this.router.navigate(['list-student']);
  }
}
