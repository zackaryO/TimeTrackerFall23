import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { TotalTimePipe } from './pipes/total-time.pipe';
import { NgChartsModule } from 'ng2-charts';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { AddStudentProjectComponent } from './add-student-project/add-student-project.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CourseReportsComponent } from './course-reports/course-reports.component';
import { EditTimecardComponent } from './edit-timecard/edit-timecard.component';
import { InactiveCoursesComponent } from './inactive-courses/inactive-courses.component';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    LoginComponent,
    TotalTimePipe,
    NavigationComponent,
    AddStudentProjectComponent,
    ViewReportComponent,
    EditCourseComponent,
    EditProjectComponent,
    UserProfileComponent,
    EditProfileComponent,
    CourseReportsComponent,
    EditTimecardComponent,
    InactiveCoursesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    MatCardModule,
    NgxPaginationModule,
  ],
  providers: [UntypedFormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
