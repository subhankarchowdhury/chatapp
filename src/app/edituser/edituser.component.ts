import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserinfoService } from '../services/userinfo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  userForm : FormGroup;
  id: string;
  userData;
  subs : Subscription;
  usersubs : Subscription
  constructor(private userinfoservice : UserinfoService, private activatedroute : ActivatedRoute,
    private route : Router, private db: AngularFirestore) { 
    this.userForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'email' : new FormControl(null,  Validators.required),
      'country' : new FormControl(null,  Validators.required),
      'phone' : new FormControl(null,  Validators.required),
      'status' : new FormControl(null,  Validators.required)
    })
    //console.log("in com");
    

    this.subs = this.activatedroute.queryParams.subscribe(params =>{
      this.id = params['id']
      this.usersubs = this.userinfoservice.getUser(this.id).subscribe(res => {
        this.userData = res.payload.data()
        this.userForm.setValue({
          name : this.userData.name,
          email : this.userData.email,
          country : this.userData.country,
          phone : this.userData.phone,
          status : this.userData.status
        })
      })
      
    } )

    
    
  }

  ngOnInit(): void {
  }

  updateUser(){
    
    // this.db.collection('users').doc(this.id).update({name : this.userForm.get('name').value}).then(()=>{
    //   this.route.navigate(['/'])
    // })
    // this.userinfoservice.updateUser(this.id,this.userForm.value).then(()=>{
    //   this.route.navigate(['/add'])
    //   console.log('updated');
    //   this.subs.unsubscribe()
    //   this.usersubs.unsubscribe()
    // })
    
    
  }

}
