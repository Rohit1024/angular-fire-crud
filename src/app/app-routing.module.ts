import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { ListStudentComponent } from './list-student/list-student.component';

const routes: Routes = [
  { path: '', redirectTo: '/list-student', pathMatch: 'full' },
  { path: 'create', component: CreateStudentComponent },
  { path: 'list-student', component: ListStudentComponent },
  { path: 'update/:id', component: EditStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
