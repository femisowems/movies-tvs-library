import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { Movie } from '../../models/movie';
import { Item } from '../item/item';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')])
    ])
  ]
})
export class SliderComponent implements OnInit {
  @Input() items: Item[] = [];
  @Input() isBanner: boolean = false;

  currentSlideIndex: number = 0;
  intervalId: any;

  readonly imagesSizes = IMAGES_SIZES;

  ngOnInit(): void {
    if (!this.isBanner) {
      this.startTimer();
    }
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
    }, 5000);
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  next() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.items.length;
    this.resetTimer();
  }

  previous() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.items.length) % this.items.length;
    this.resetTimer();
  }

  setSlide(index: number) {
    this.currentSlideIndex = index;
    this.resetTimer();
  }

  resetTimer() {
    this.stopTimer();
    this.startTimer();
  }
}
