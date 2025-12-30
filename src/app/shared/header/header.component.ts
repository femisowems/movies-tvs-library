import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mobileMenuOpen = false;
  searchTerm: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  search() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { search: this.searchTerm } });
      this.searchTerm = ''; // Clear after search
      this.closeMobileMenu();
    }
  }

}
