import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Form, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-addperson',
  templateUrl: './addperson.component.html',
  styleUrls: ['./addperson.component.css']
})
export class AddpersonComponent implements OnInit {
  form: FormGroup;
  personId: String;
  person: any;

  constructor(
    private formBuilder: FormBuilder,
    private studentSrv: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrSrv: ToasterService
  ) { }

  ngOnInit() {
    this.personId = this.route.snapshot.queryParams['id'];
    this.initData();
  }
  
  initData(){
    console.log(this.personId);
    this.form = this.formBuilder.group({
      name: '',
      age: '',
      gender: '',
      mobileNumber: ''
    });
    if(this.personId){
      this.getPersonDetails();
    }
  }

  getPersonDetails(){
    this.studentSrv.getPersonDetails(this.personId).subscribe((res)=>{
      if(res.success){
        this.form = this.formBuilder.group({
          name: res.data.name,
          age: res.data.age,
          gender: res.data.gender,
          mobileNumber: res.data.mobileNumber
        });
      }else{
        this.showToastMsg("warning",res.msg,null);                  
      }
    },(err)=>{
      this.showToastMsg("warning",err.msg,null);                
    })
  }

  showToastMsg(type, title, body){
    let toast: Toast = {
      type: type,
      title: title,
      body: body,
      showCloseButton: true
    };
    this.toastrSrv.pop(toast);
  }
  

  addPerson(){
    if(this.personId){
      this.studentSrv.updatePerson(this.personId, this.form.value).subscribe((res) => {
        if(res.success){
          this.showToastMsg("success",res.msg,null);          
          this.router.navigate(['/persons']);
        }else{
          this.showToastMsg("warning",res.msg,null);
        }
      },(err) => {
        this.showToastMsg("warning",err.msg,null);        
      })
    }else{
      this.studentSrv.addPerson(this.form.value).subscribe((res) => {
        if(res.success){
          this.showToastMsg("success",res.msg,null);                    
          this.router.navigate(['/persons']);
        }else{
          this.showToastMsg("warning",res.msg,null);          
        }
      },(err) => {
        this.showToastMsg("warning",err.msg,null);        
      })
    }
  }

}
