import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../item/item.component';
import { Item } from '../item/item';

@Component({
  selector: 'items-banner',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class ItemsBannerComponent {
  @Input() items: Item[] = [];
  @Input() title: string = '';
}
