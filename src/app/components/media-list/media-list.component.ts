import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../item/item';
import { ItemComponent } from '../item/item.component';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';

export interface FilterState {
    page: number;
    search?: string;
    startDate?: string;
    endDate?: string;
    sort?: string;
    selectedGenres?: number[];
    category?: string;
    watchProviders?: number[];
}

// Assuming Genre interface is defined elsewhere or will be added.
// For now, using 'any' if not explicitly defined.
interface Genre {
    id: number;
    name: string;
}

@Component({
    selector: 'app-media-list',
    templateUrl: './media-list.component.html',
    styleUrls: ['./media-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ItemComponent,
        PaginatorModule,
        InputTextModule,
        CalendarModule,
        AccordionModule,
        CheckboxModule,
        DropdownModule,
        RadioButtonModule
    ]
})
export class MediaListComponent {
    @Input() title: string = '';
    @Input() items: Item[] = [];
    @Input() genres: Genre[] = [];
    @Input() totalRecords: number = 0;

    @Output() filterChange = new EventEmitter<FilterState>();

    // Filter State
    searchValue: string = '';
    category: string = 'popular';
    startDate: string = '';
    endDate: string = '';
    sortBy: string = 'popularity.desc';
    selectedGenres: number[] = [];
    showMeValue: string = 'everything';
    selectedWatchProviders: number[] = [];

    categories = [
        { name: 'Popular', value: 'popular' },
        { name: 'Top Rated', value: 'top_rated' },
        { name: 'Upcoming', value: 'upcoming' }
    ];

    sortOptions = [
        { label: 'Popularity Descending', value: 'popularity.desc' },
        { label: 'Popularity Ascending', value: 'popularity.asc' },
        { label: 'Rating Descending', value: 'vote_average.desc' },
        { label: 'Rating Ascending', value: 'vote_average.asc' },
        { label: 'Release Date Descending', value: 'release_date.desc' },
        { label: 'Release Date Ascending', value: 'release_date.asc' }
    ];

    watchProviders = [
        { id: 8, name: 'Netflix' },
        { id: 119, name: 'Amazon Prime' },
        { id: 337, name: 'Disney+' },
        { id: 350, name: 'Apple TV' },
        { id: 15, name: 'Hulu' },
        { id: 384, name: 'HBO Max' },
        { id: 531, name: 'Peacock' }
    ];

    constructor() { }

    // Event Handlers
    searchChanged() {
        this.emitFilters();
    }

    changeCategory(catValue: string) {
        this.category = catValue;
        this.selectedGenres = [];
        this.startDate = '';
        this.endDate = '';
        this.searchValue = '';
        this.emitFilters();
    }

    toggleGenre(genreId: number) {
        if (this.selectedGenres.includes(genreId)) {
            this.selectedGenres = this.selectedGenres.filter(id => id !== genreId);
        } else {
            this.selectedGenres.push(genreId);
        }
        this.emitFilters();
    }

    toggleWatchProvider(providerId: number) {
        if (this.selectedWatchProviders.includes(providerId)) {
            this.selectedWatchProviders = this.selectedWatchProviders.filter(id => id !== providerId);
        } else {
            this.selectedWatchProviders.push(providerId);
        }
        this.emitFilters();
    }

    applyFilters() {
        this.emitFilters();
    }

    paginate(event: any) {
        const page = event.page + 1;
        this.emitFilters(page);
    }

    private emitFilters(page: number = 1) {
        const state: FilterState = {
            page: page,
            search: this.searchValue,
            category: this.category,
            startDate: this.startDate ? new Date(this.startDate).toISOString().split('T')[0] : '',
            endDate: this.endDate ? new Date(this.endDate).toISOString().split('T')[0] : '',
            sort: this.sortBy,
            selectedGenres: this.selectedGenres,
            watchProviders: this.selectedWatchProviders
        };
        this.filterChange.emit(state);
    }
}

