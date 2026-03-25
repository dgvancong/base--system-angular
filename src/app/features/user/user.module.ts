import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconCustomService } from '../../core/services/icon/icon-system.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserRoutingModule } from './user-routing.module';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { UserAddComponent } from './pages/user-add/user-add.component';
import { UserDeleteComponent } from './pages/user-delete/user-delete.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PaginationModule } from 'src/app/core/components/pagination/pagination.module';
import { ContentFollowModule } from 'src/app/core/components/content-follow/content-follow.module';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { PopupModule } from 'src/app/core/components/popup/popup.module';


@NgModule({
  declarations: [
    ManageUserComponent,
    UserAddComponent,
    UserDeleteComponent,
    UserDetailsComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzIconModule,
    UserRoutingModule,
    NzToolTipModule,
    NzTableModule,
    PaginationModule,
    ContentFollowModule,
    NzAvatarModule,
    PopupModule
  ],
  providers: [
    IconCustomService
  ],
})
export class UserModule {}

