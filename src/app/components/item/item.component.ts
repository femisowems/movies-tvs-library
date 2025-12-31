import { Component, Input, OnInit } from '@angular/core';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { Item } from './item';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() itemData: Item | null = null;
  @Input() title: string = '';

  imagesSizes = IMAGES_SIZES;
  isFavorite = false;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    if (this.itemData) {
      this.isFavorite = this.storageService.isItemInList(this.itemData.id);
    }
  }

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.itemData) return;

    if (this.isFavorite) {
      this.storageService.removeItem(this.itemData.id);
      this.isFavorite = false;
    } else {
      this.storageService.addItem(this.itemData);
      this.isFavorite = true;
    }
  }
}
