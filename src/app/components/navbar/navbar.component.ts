import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public role_id = JSON.parse(localStorage.getItem('user_info')).role_id;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.role_id)
  }

  logout(){
    localStorage.removeItem('token_logic')
    localStorage.removeItem('user_info')
    this.router.navigate(['/login'])
  }

}
