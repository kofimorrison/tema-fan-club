import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-hero-image',
  standalone: true,
  imports: [],
  templateUrl: './heroImage.component.html',
  styleUrl: './heroImage.component.scss'
})
export class HeroImage implements AfterViewInit {
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
      this.tryAutoplay();
  }

  private tryAutoplay(): void {
    const video = this.heroVideo.nativeElement;
    video.muted = true;
    video.play();
  }
}
