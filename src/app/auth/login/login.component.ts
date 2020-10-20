import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { emailValidator } from './../../shared/validators/functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formErrors = [];
  message: string;
  timeoutEvent: NodeJS.Timer;

  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkRegisterMessage();
  }

  ngOnDestroy(): void {
    this.timeoutEvent && clearTimeout(this.timeoutEvent);
  }

  initForm = () => {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.emailPattern),
          emailValidator('quan612@yahoo.com'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  };

  login() {
    if (this.loginForm.invalid) return;

    this.formErrors = [];
    return this.userService.login(this.loginForm).subscribe(
      (_) => {
        if (this.userService.redirectUrl) {
          this.router.navigate([this.userService.redirectUrl]);
          this.userService.redirectUrl = null;
        } else this.router.navigate(['/rentals']);
      },
      (errors) => {
        this.formErrors = errors;
      }
    );
  }

  checkRegisterMessage = () => {
    this.route.queryParams.subscribe((params) => {
      this.message = params['message'] || null;

      this.timeoutEvent = setTimeout(() => {
        this.router.navigate([], {
          replaceUrl: true,
          queryParams: { message: null },
          queryParamsHandling: 'merge',
        });
        this.message = null;
      }, 3000);
    });
  };

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  get diagnostics() {
    return JSON.stringify(this.loginForm.value);
  }
}
