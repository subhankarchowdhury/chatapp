import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor(private db: AngularFirestore, private route : Router) { }

  getUsers(){
    return this.db.collection('users').snapshotChanges()
  }

  getUser(id){
    return this.db.collection('users').doc(id).snapshotChanges()
  }

  addUser(userinfo){
    this.db.collection('users').add(userinfo)
  }

  updateUser(id,userinfo){
    return this.db.collection('users').doc(id).set(userinfo)
  }
}
