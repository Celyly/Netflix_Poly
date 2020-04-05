import { Component, OnInit } from '@angular/core';
import { RegisterMemberService } from 'src/app/register-member.service';

@Component({
  selector: 'app-register-plan',
  templateUrl: './register-plan.component.html',
  styleUrls: ['./register-plan.component.css']
})
export class RegisterPlanComponent implements OnInit {

  constructor(public registerMemberService: RegisterMemberService) { 

  }

  ngOnInit(): void {
  }

  public sendPlan(name: string): void {
    this.registerMemberService.setPlan(name);
  }

}
