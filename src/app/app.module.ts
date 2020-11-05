import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ChartsModule } from 'ng2-charts';
import { NgProgressInterceptor, NgProgressModule } from 'ngx-progressbar';

import { AppComponent } from './components/app/app.component';
import { DatabaseComponent } from './components/database/database.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { AlertsLayoutComponent } from './components/layout/alerts-layout/alerts-layout.component';
import { LayoutComponent } from './components/layout/base/layout.component';
import { ButtonsLayoutComponent } from './components/layout/buttons-layout/buttons-layout.component';
import { TypographyComponent } from './components/layout/typography/typography.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NavBarComponent } from './components/shared/navbar/navbar.component';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { DropdownComponent } from './components/sheet/dropdown.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { UserDetailsComponent } from './components/users/details/user-details.component';
import { UserListComponent } from './components/users/list/user-list.component';
import { CreateEditUserComponent } from './components/users/shared/create-edit-user/create-edit-user.component';
import { NgInitDirective } from './directives/ng-init.directive';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HttpService } from './services';
import { ExcelDatabaseService } from './services/excel-database.service';

const appRoutes: Routes = [
  {
      path: '',
      component: MainLayoutComponent,
      // canActivate: [AuthGuard],
      children: [
          { path: '', pathMatch: 'full', redirectTo: '/home' },
          { path: 'home', component: HomeComponent, data: {title: 'Dashboard'} },
          { path: 'database', component: DatabaseComponent, data: {title: 'Database'}},

          { path: 'users', component: UserListComponent, data: {title: 'Users'}},
          { path: 'users/new', component: CreateEditUserComponent, data: {title: 'New user'} },
          { path: 'users/edit/:id', component: CreateEditUserComponent, data: {title: 'Edit user'} },
          { path: 'users/details/:id', component: UserDetailsComponent, data: {title: 'User details'} },
          { path: 'settings', component: SettingsComponent, data: {title: 'Settings'} },
          { path: 'profile', component: ProfileComponent, data: {title: 'Profile'} },
          {
            path: 'layout', data: {title: 'Layout'},
            children:[
              { path: 'base', component: LayoutComponent, data: {title: 'Base layout'} },
              { path: 'alerts', component: AlertsLayoutComponent, data: {title: 'Alerts & Callouts'} },
              { path: 'buttons', component: ButtonsLayoutComponent, data: {title: 'Buttons'} },
              { path: 'typography', component: TypographyComponent, data: {title: 'Typography'} }
            ]
          }
      ]
  },
  {
      path: '',
      component: LoginLayoutComponent,
      children: [
          {
              path: 'login',
              component: LoginComponent
          }
      ]
  },
  { path: '**', redirectTo: '/home' }

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainLayoutComponent,
    NavBarComponent,
    LoginLayoutComponent,
    LoginComponent,
    UserListComponent,
    UserListComponent,
    ToolbarComponent,
    UserDetailsComponent,
    SettingsComponent,
    ProfileComponent,
    NgInitDirective,
    LayoutComponent,
    CreateEditUserComponent,
    AlertsLayoutComponent,
    ButtonsLayoutComponent,
    TypographyComponent,
    ConfirmDialogComponent,
    SheetComponent,
    DatabaseComponent,
    DropdownComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    NgProgressModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatListModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTabsModule,
    MatChipsModule,

    ChartsModule,
    RoundProgressModule
  ],
  providers: [
    HttpService,
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgProgressInterceptor,
      multi: true
    },
    ExcelDatabaseService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }
