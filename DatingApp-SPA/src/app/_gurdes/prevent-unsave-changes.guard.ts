import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import { MemberEditeComponent } from '../member/member-edite/member-edite.component';
@Injectable()
export class PereventUnsaveChanges implements CanDeactivate<MemberEditeComponent> {
    canDeactivate(component: MemberEditeComponent) {
        if (component.editeForm.dirty) {
            return confirm('Are you sure youwant continue?  any un saved changes will be lost');
        }
        return true;
    }
}
