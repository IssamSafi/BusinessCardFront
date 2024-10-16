import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BusinessCardInfo';
  constructor(private router: Router) {} 

  goToCreate() {
    this.router.navigate(['/create']); 
  }

  goToList() {
    this.router.navigate(['/list']); 
  }
}
