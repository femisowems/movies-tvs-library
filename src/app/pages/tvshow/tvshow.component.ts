import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { SliderComponent } from 'src/app/components/slider/slider.component';
import { VideoEmbedComponent } from 'src/app/components/video-embed/video-embed.component';
import { Item } from 'src/app/components/item/item';
import { ItemsBannerComponent } from 'src/app/components/items-banner/items-banner.component';
import {
  mapTvShowToItem,
  TvShow,
  TvShowCredits,
  TvShowImages,
  TvShowVideo
} from 'src/app/models/tv';
import { TvShowsService } from 'src/app/services/tvshows.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';

@Component({
  selector: 'app-tvShow',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    ImageModule,
    CarouselModule,
    SliderComponent,
    VideoEmbedComponent,
    ItemsBannerComponent
  ],
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.scss']
})
export class TvShowComponent implements OnInit, OnDestroy {
  tvShow: TvShow | null = null;
  tvShowBanner: Item | null = null;
  tvShowVideos: TvShowVideo[] = [];
  tvShowImages: TvShowImages | null = null;
  tvShowCredits: TvShowCredits | null = null;
  similarTvShows: Item[] = [];
  imagesSizes = IMAGES_SIZES;


  constructor(private route: ActivatedRoute, private tvShowsService: TvShowsService) { }

  ngOnInit(): void {
    this.route.params.pipe().subscribe(({ id }) => {
      this.getTvShow(id);
      this.getTvShowVideos(id);
      this.getTvShowImages(id);
      this.getTvShowCredits(id);
      this.getTvShowSimilar(id);
    });
  }

  ngOnDestroy() {
    console.log('component destroyed');
  }

  getTvShow(id: string) {
    this.tvShowsService.getTvShow(id).subscribe((tvShowData) => {
      this.tvShowBanner = mapTvShowToItem(tvShowData);
      this.tvShow = tvShowData;
    });
  }

  getTvShowVideos(id: string) {
    this.tvShowsService.getTvShowVideos(id).subscribe((tvShowVideosData) => {
      this.tvShowVideos = tvShowVideosData;
    });
  }

  getTvShowImages(id: string) {
    this.tvShowsService.getTvShowImages(id).subscribe((tvShowImagesData) => {
      this.tvShowImages = tvShowImagesData;
    });
  }

  getTvShowCredits(id: string) {
    this.tvShowsService.getTvShowCredits(id).subscribe((tvShowCreditsData) => {
      this.tvShowCredits = tvShowCreditsData;
    });
  }

  getTvShowSimilar(id: string) {
    this.tvShowsService.getTvShowSimilar(id).subscribe((tvShowSimilarData) => {
      this.similarTvShows = tvShowSimilarData.map((tvShow) => mapTvShowToItem(tvShow));
    });
  }
}
