import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../shared/student';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  createForm!: FormGroup;
  courses = ["Science", "Commerce", "Arts", "Literature", "Medical"];
  constructor(private fb: FormBuilder, private service: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date_of_birth: ['', Validators.required],
      course: ['', Validators.required],
      fees: ['', Validators.required]
    })
  }

  get form(): { [key: string]: AbstractControl } {
    return this.createForm.controls;
  }

  reset():void {
    this.createForm.reset();
  }

  onSubmit(): void {
    if(this.createForm.valid){
      console.table(this.createForm.value)
      this.service.createStudent(this.createForm.value as Student)
      .then(() => {
        console.log("Created new item Successfully");
        this.router.navigate(['list-student']);
      })
    }
  }

}
