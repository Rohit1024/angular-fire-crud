import { Injectable } from '@angular/core';
import { Student } from './student';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  collection: string = 'student-collection';

  studentRef!: AngularFirestoreCollection<Student>;
  constructor(private angularFirestore: AngularFirestore) {
    this.studentRef = this.angularFirestore.collection(this.collection);
  }

  getStudentDoc(id: string) {
    return this.studentRef.doc(id).valueChanges();
  }

  getStudentList(): AngularFirestoreCollection<Student> {
    return this.studentRef;
  }

  createStudent(student: Student): any {
    return this.studentRef.add({ ...student });
  }

  deleteStudent(id: string) {
    return this.studentRef.doc(id).delete();
  }

  updateStudent(student: Student, id: string) {
    return this.studentRef
    .doc(id).update(student);
  }
}
