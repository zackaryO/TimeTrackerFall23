import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  public errMsg = '';
  public courseID: any;

  public currentUser: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const tempUser = localStorage.getItem('currentUser');
    if (tempUser) {
        this.currentUser = JSON.parse(tempUser);
    }

    // This will grab values from the state variable of the navigate function we defined while navigating to this page.  This solution was found here https://stackoverflow.com/a/54365098
    console.log(`State received: ${JSON.stringify(this.router.getCurrentNavigation()?.extras.state)}`);  // For debugging only
    this.courseID = this.router.getCurrentNavigation()?.extras.state?.courseID;
  }

  ngOnInit(): void {
    
  }

  createProjectForm = this.formBuilder.group({
    projectName: '',
    description: '',
    isActive: '',
    courseID: '',
  });

  onSubmit(): void {
    // An extra check condition to prevent submission of the data unless the form is valid 
    if (!this.createProjectForm.valid) {
        return;
    }

    let payload = {
      projectName: this.createProjectForm.value['projectName'],
      description: this.createProjectForm.value['description'],
      isActive: true,
      courseID: this.courseID,
    }

    this.http.post<any>('https://localhost:8080/api/createProject', payload, { headers: new HttpHeaders({ "Access-Control-Allow-Headers": "Content-Type" }) }).subscribe({
      next: data => {
        this.errMsg = "";
        this.GoBackToCourse();
      },
      error: error => {
        this.errMsg = error['error']['message'];
      }
    });
  }

  GoBackToCourse() {
    let state = {courseID: this.courseID};
    // navigate to the component that is attached to the url inside the [] and pass some information to that page by using the code described here https://stackoverflow.com/a/54365098
    this.router.navigate(['/course'], { state });
  }
}
