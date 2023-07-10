import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];
  username = "";

  constructor(private appService: AppService, private router: Router) {
    let login_flag = localStorage.getItem('softrams_racing_login');
    if (login_flag == null || login_flag == 'false') {
      router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.username = localStorage.getItem('softrams_racing_name');
    this.appService.getMembers().subscribe((members) => (this.members = members));
  }

  goToAddMemberForm() {
    console.log(`Hmmm...we didn't navigate anywhere`);
    this.router.navigate(['/add-member']);
  }
  goToEditMember(id) {
    this.router.navigate(['/edit-member/' + id]);
  }
  goToDeleteMember(id) {
    let data = {
      id: id
    };
    this.appService.deleteMember(data).subscribe((response) => {
      if (response.status == 'success') {
        this.appService.getMembers().subscribe((members) => (this.members = members));
      }
    });
  }

  logout() {
    this.appService.username = '';
    localStorage.setItem('softrams_racing_login', 'false');
    localStorage.setItem('softrams_racing_name', '');
    this.router.navigate(['/login']);
  }
  editMemberByID(id: number) {}

  deleteMemberById(id: number) {}
}
