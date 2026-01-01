import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Added
import { Router, RouterModule } from '@angular/router'; // Added RouterModule
import { FormsModule } from '@angular/forms'; // Added for ngModel

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true, // Added
  imports: [CommonModule, RouterModule, FormsModule] // Added
})
export class HeaderComponent implements OnInit {

  mobileMenuOpen = false;
  profileOpen = false;
  searchTerm: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleProfileMenu() {
    this.profileOpen = !this.profileOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    this.profileOpen = false;
  }

  search() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { search: this.searchTerm } });
      this.searchTerm = ''; // Clear after search
      this.closeMobileMenu();
    }
  }

}
