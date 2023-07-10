import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertMessage: String;
  teams = [];
  id = "";

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private activatedRouter: ActivatedRoute) {
    this.memberForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      team: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.alertMessage = "";
    this.appService.getTeams().subscribe((teams) => (this.teams = teams));
    this.activatedRouter.params.subscribe(params => {
      this.appService.getMember({id: params.id}).subscribe((member) => {
        this.memberModel = member;
        this.memberForm = this.fb.group({
          firstName: new FormControl(this.memberModel?this.memberModel.firstName:'', Validators.required),
          lastName: new FormControl(this.memberModel?this.memberModel.lastName:'', Validators.required),
          jobTitle: new FormControl(this.memberModel?this.memberModel.jobTitle:'', Validators.required),
          team: new FormControl(this.memberModel?this.memberModel.team:'', Validators.required),
          status: new FormControl(this.memberModel?this.memberModel.status:'', Validators.required),
        });
      });
    })
    
  }

  back() {
    this.router.navigate(['/members']);
  }
  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    console.log(this.memberModel.id, form.value);
    let data = {
      id: this.memberModel.id,
      data: form.value
    }
    this.appService.editMember(data).subscribe((response) => {
      this.alertMessage = response.message;
      setTimeout(() => {
        this.router.navigate(['/members']);
      }, 3000);
    });
  }

}
