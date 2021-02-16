import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/services/userinfo.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
userForm : FormGroup;

  constructor(private userinfoservice: UserinfoService,
              private route: Router) { 
    this.userForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'email' : new FormControl(null,  Validators.required),
      'country' : new FormControl(null,  Validators.required),
      'phone' : new FormControl(null,  Validators.required),
      'status' : new FormControl(null,  Validators.required),
      'created': new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
  }

  addUser(){
    //console.log(this.userForm.get('created').value);
    
    this.userinfoservice.addUser(this.userForm.value)
    this.userForm.reset()
    this.route.navigate(['/'])
  }

}
