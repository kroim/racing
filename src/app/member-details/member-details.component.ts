import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

// This interface may be useful in the times ahead...
interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) {}

  ngOnInit() {
    this.alertMessage = "";
    this.appService.getTeams().subscribe((teams) => (this.teams = teams));
    this.memberForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      team: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  ngOnChanges() {}

  back() {
    this.router.navigate(['/members']);
  }
  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.appService.addMember(form.value).subscribe((response) => {
      this.alertMessage = response.message;
      setTimeout(() => {
        this.router.navigate(['/members']);
      }, 3000);
    });
  }
}
