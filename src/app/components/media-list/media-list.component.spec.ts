import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaListComponent } from './media-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('MediaListComponent', () => {
    let component: MediaListComponent;
    let fixture: ComponentFixture<MediaListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MediaListComponent, BrowserAnimationsModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MediaListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit filterChange when paginate is called', () => {
        spyOn(component.filterChange, 'emit');
        component.paginate({ page: 1 }); // Page index 1 means page 2
        expect(component.filterChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({ page: 2 }));
    });

    it('should emit filterChange when category changes', () => {
        spyOn(component.filterChange, 'emit');
        component.changeCategory('top_rated');
        expect(component.category).toBe('top_rated');
        expect(component.filterChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({ category: 'top_rated', page: 1 }));
    });

    it('should toggle genre and emit filterChange', () => {
        spyOn(component.filterChange, 'emit');
        const genreId = 28;
        component.toggleGenre(genreId);
        expect(component.selectedGenres).toContain(genreId);
        expect(component.filterChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({ selectedGenres: [genreId] }));

        component.toggleGenre(genreId);
        expect(component.selectedGenres).not.toContain(genreId);
        expect(component.filterChange.emit).toHaveBeenCalled();
    });

    it('should toggle watch provider and emit filterChange', () => {
        spyOn(component.filterChange, 'emit');
        const providerId = 8;
        component.toggleWatchProvider(providerId);
        expect(component.selectedWatchProviders).toContain(providerId);
        expect(component.filterChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({ watchProviders: [providerId] }));

        component.toggleWatchProvider(providerId);
        expect(component.selectedWatchProviders).not.toContain(providerId);
        expect(component.filterChange.emit).toHaveBeenCalled();
    });
});
