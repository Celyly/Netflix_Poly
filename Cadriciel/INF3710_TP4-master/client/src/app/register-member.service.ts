import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Member } from "../../../common/Member";

@Injectable({
  providedIn: "root"
})
export class RegisterMemberService {
  public plan: BehaviorSubject<string>;
  public member: BehaviorSubject<Member | null>;

  public constructor() {
    this.plan = new BehaviorSubject<string>("monthly");
    this.member = new BehaviorSubject<Member | null>(null);
  }

  public setPlan(myPlan: string): void {
    this.plan.next(myPlan);
  }

  public createMember(myMember: Member): void {
    this.member.next(myMember);
  }
}
