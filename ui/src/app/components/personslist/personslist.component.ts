import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-persons',
  templateUrl: './personslist.component.html',
  styleUrls: ['../addperson/addperson.component.css']
})
export class PersonsListComponent implements OnInit {

  persons: any[];
  noData: Boolean = true;
  showMsg: Boolean = false;
  msg: String;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private studentSrv: StudentService,
      private toastrSrv: ToasterService      
  ) { }

  ngOnInit() {
      this.getPersonsList();
  } 

  getPersonsList(){  
      this.studentSrv.getPersons().subscribe((res) => {
        if(res.success){
          this.persons = res.data;
          this.noData = res.data.length > 0 ? false : true;
        }else{
          this.noData = true;
          this.persons = [];
        }
      },(err) => {
        this.showToastMsg("warning",err.msg,null);
      });
  }

  editPerson(person){
    this.router.navigate(['person'],{queryParams: {id: person['_id']}});
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

  deletePerson(person){
    this.showMsg = true;
    this.studentSrv.deletePerson(person['_id']).subscribe((res)=>{
      let css = res.success ? "success" : "warning";
      this.showToastMsg(css,res.msg,null);          
      this.getPersonsList();
    },(err)=>{
      this.showToastMsg("warning",err.msg,null);
    })
    
  }

}
