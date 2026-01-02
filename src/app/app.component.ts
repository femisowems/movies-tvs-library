import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent]
})
export class AppComponent implements OnInit {
  title = 'movies-app';

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        if (child?.snapshot.data['title']) {
          return child.snapshot.data['title'];
        }
        return 'Movies & TV Shows Library';
      })
    ).subscribe((title: string) => {
      if (title === 'Home' || title === 'Movies & TV Shows Library') {
        this.titleService.setTitle('Movies & TV Shows Library');
      } else {
        this.titleService.setTitle(`${title} | Movies & TV Shows Library`);
      }
    });
  }
}
