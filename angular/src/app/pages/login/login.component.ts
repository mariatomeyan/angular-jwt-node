import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="container">
      <div class="blurred"></div>
      <mat-card class="card">
        <mat-card-header>
          <mat-card-title>Welcome Back</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm">
            <mat-form-field appearance="fill">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username">
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Password</mat-label>
              <input matInput formControlName="password" type="password">
            </mat-form-field>
            <button (click)="login()"  mat-raised-button color="primary" class="login-button">Login</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.loginForm = this.fb.group({
      username: ['admin', [Validators.required]],
      password: ['admin', [Validators.required]],
    })
  }
  login() {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password)
        .subscribe(
          (res) => {
            this.router.navigateByUrl('/countries');
          }
        );
    }
  }
  ngOnInit() {}
}
