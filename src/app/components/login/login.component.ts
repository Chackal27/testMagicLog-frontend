import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;

  public errorPass:boolean = false;

  public descriptionError:string = ""
  public descriptionSuccess:string = ""

  @ViewChild('errorSwal') public errorSwal: SwalComponent | undefined
  @ViewChild('successSwal') public successSwal: SwalComponent | undefined
  @ViewChild('errorExistSwal') public errorExistSwal: SwalComponent | undefined
  @ViewChild('errorIncorrectSwal') public errorIncorrectSwal: SwalComponent | undefined
  

  constructor(private loginService: LoginService, private userService: UserService, private router: Router) { 
    let role_id = localStorage.getItem('user_info') != null ? JSON.parse(localStorage.getItem('user_info')).role_id : null
    if(localStorage.getItem('token_logic') != null && role_id != null && role_id == 1 || role_id == 2){
      this.router.navigate(['/products'])
    }else{
      this.router.navigate(['/login'])
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  get email() { return this.loginForm?.get('email'); }
  get password() { return this.loginForm?.get('password'); }

  get _email() { return this.registerForm?.get('email'); }
  get _password() { return this.registerForm?.get('password'); }
  get confirmPassword() { return this.registerForm?.get('confirmPassword'); }

  goToMarket(){ 
    this.router.navigate(['/marketplace'])
  }

  login(){
    let object = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this.loginService.login(object).subscribe(res => {
      console.log(res)
      localStorage.setItem('token_logic', res.token)
      localStorage.setItem('user_info', JSON.stringify(res.user[0]))
      this.router.navigate(['/products']);
    }, err => {
      if(err.error.found){
        this.errorIncorrectSwal.fire()
        return
      }
      this.errorSwal.fire()
      console.log(err.error);
    })
  }

  onKeyPress(e){ 
    let password= this.registerForm.get('password').value
    let password_repeat= this.registerForm.get('confirmPassword').value

    if(password !== password_repeat){
      this.errorPass = true
    }else{
      this.errorPass = false
    }
  }

  register(){
    let object = {
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      password_repeat: this.registerForm.get('confirmPassword').value
    }

    this.userService.createUser(object).subscribe(res => {
      console.log(res)
      this.descriptionSuccess = res.message
      this.successSwal.fire()
    }, err => {
      console.log(err)
      if(err.error.exist){
        this.errorExistSwal.fire()
        return
      }
      this.errorSwal.fire()
    })
  }

  closeSwal(){
    this.errorSwal.close()
    this.successSwal.close()
    this.errorExistSwal.close()
    this.errorIncorrectSwal.close()
  }

  cleanForms(){ 
    this.loginForm.reset()
    this.registerForm.reset()
  }

}
