import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
    selector: 'app-my-list',
    templateUrl: './my-list.component.html',
    styleUrls: ['./my-list.component.scss']
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
