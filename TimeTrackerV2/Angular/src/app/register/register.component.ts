import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import CryptoES from 'crypto-es'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public pageTitle = 'TimeTrackerV2 | Register'
  public errMsg = '';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  registrationForm = this.formBuilder.group({
    username: '',
    firstName: '',
    lastName: '',
    type: '',
    password: '',
    repeatPassword: '',
  });

  onSubmit(): void {
    if(!this.registrationForm.valid) {
        this.errMsg = "Missing one or more required arguments";
        return;
    }
    const pass1 = this.registrationForm.value['password'];
    const pass2 = this.registrationForm.value['repeatPassword'];
    // if the two passwords don't match
    if(pass1 !== pass2)
    {
        this.errMsg = "Given passwords do not match";
        return;
    }
    this.errMsg = "";

    const salt = CryptoES.lib.WordArray.random(16).toString();  //Creates a salt value that is 16*2 (default encoder for toString() is hexadecimal) values long (this is because hex uses 1/2 of the byte while a character uses the full byte)
    const hashedPassword = CryptoES.PBKDF2(pass1, salt, { keySize: 512/32, iterations: 1000 }).toString();

    let payload = {
      username: this.registrationForm.value['username'],
      firstName: this.registrationForm.value['firstName'],
      lastName: this.registrationForm.value['lastName'],
      type: this.registrationForm.value['type'],
      password: hashedPassword,
      salt: salt,
    }

    this.http.post<any>('https://localhost:8080/api/register/', payload, { headers: new HttpHeaders({ "Access-Control-Allow-Headers": "Content-Type" }) }).subscribe({
      next: data => {
        this.errMsg = "";
        this.router.navigate(['./']);
      },
      error: error => {
        this.errMsg = error['error']['message'];
      }
    });
  }

}
