import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Added
import { RouterModule } from '@angular/router'; // Added
import { ItemComponent } from '../../components/item/item.component'; // Added
import { TabViewModule } from 'primeng/tabview'; // Added
import { StorageService } from '../../services/storage.service';

@Component({
    selector: 'app-my-list',
    templateUrl: './my-list.component.html',
    styleUrls: ['./my-list.component.scss'],
    standalone: true, // Added
    imports: [CommonModule, RouterModule, TabViewModule, ItemComponent] // Added
})
export class MyListComponent implements OnInit {
    items: any[] = [];

    constructor(private storageService: StorageService) { }

    ngOnInit(): void {
        this.items = this.storageService.getList();
    }

    getMovies() {
        return this.items.filter(item => !item.first_air_date); // Basic check for movie vs tv
    }

    getTvShows() {
        return this.items.filter(item => item.first_air_date);
    }
}
