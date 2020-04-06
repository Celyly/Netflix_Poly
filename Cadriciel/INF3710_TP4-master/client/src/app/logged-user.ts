import { Member } from "../../../common/Member";

export class LoggedUser {
    public member: Member | null;
    public role: string;

    public constructor() {
        this.role = "GUEST";
    }
}
