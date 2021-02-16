import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { UserinfoService } from '../services/userinfo.service';

export interface Userwithoutid{ 
  name : string,
  email : string,
  country: string,
  phone : string,
  isActive: boolean
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  users: Observable<any>
  

  constructor(private userinfoservice: UserinfoService, private router : Router) { }

  ngOnInit(): void {
     this.users = this.userinfoservice.getUsers().pipe(map(usersinfo =>{
      return usersinfo.map(userinfo => {
        const data = userinfo.payload.doc.data() as Userwithoutid
        const id = userinfo.payload.doc.id;
        return { id, ...data };
      })
     }))
  }

  updateUser(id){
    this.router.navigate(['/edit'],{queryParams: {id : id}})
  }  

  deleteUser(id){
    if(confirm("Do you want to delete the contact?")){
      this.userinfoservice.deleteUser(id)
    }
  }
}



