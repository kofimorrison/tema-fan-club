import {
  Component,
  AfterViewInit,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  CUSTOM_ELEMENTS_SCHEMA,
  Renderer2,
  EventEmitter,
  Output,
  HostListener,
} from '@angular/core';
import Isotope from 'isotope-layout';
import AOS, { init } from 'aos';
// @ts-ignore
import '../../assets/js/vendor/aos/aos.css';
import Swiper from 'swiper';
import GLightbox from 'glightbox';
import PureCounter from '@srexi/purecounterjs';
import { CommonModule } from '@angular/common';
import { VideoComponent } from '../video/video.component';
import { WordGridComponent } from '../word-grid/word-grid.component';
import { MapComponent } from '../map/map.component';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

type SectionVisibilityFlags = {
  [K in
  | 'isHomeVisible'
  | 'isVerkaufVisible'
  | 'isVermietungVisible'
  | 'isLeistungenVisible'
  | 'isBeratungVisible'
  | 'isZusammenarbeitVisible'
  | 'isAngeboteVisible'
  | 'isKontaktVisible'
  | 'isFaqVisible'
  | 'isImpressumVisible'
  | 'isDatenSchutzVisible'
  | 'isWiderrufsbelehrungVisible']: boolean;
};

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    VideoComponent,
    MapComponent,
    WordGridComponent,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: [
    './home-page.component.css',
    '../../assets/js/vendor/aos/aos.css',
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  @ViewChild('portfolioContainer') portfolioContainerRef!: ElementRef;
  @ViewChild('testimonialSlider') testimonialSlider: any;
  @ViewChild('testimonialSlider2') testimonialSlider2: any;
  @ViewChild('testimonialSlider3') testimonialSlider3: any;
  @ViewChild('testimonialSlider4') testimonialSlider4: any;
  @ViewChild('testimonialSlider5') testimonialSlider5: any;
  @ViewChild('testimonialSlider6') testimonialSlider6: any;
  @ViewChild('testimonialSlider7') testimonialSlider7: any;
  @ViewChild('testimonialSlider8') testimonialSlider8: any;
  @ViewChild('testimonialSlider9') testimonialSlider9: any;
  @ViewChild('testimonialSlider10') testimonialSlider10: any;
  @ViewChild('testimonialSlider11') testimonialSlider11: any;
  @ViewChild('testimonialSlider12') testimonialSlider12: any;
  @ViewChild('clientsSwipper') clientsSwipper: any;
  isInSection = false;
  openNav: boolean = false;
  // for tema fan club(formspree.io)
  private formspreeUrl = 'https://formspree.io/f/xqeawplw';
  loading = false;
  success = false;
  error = false;

  form = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };
  @Output() sectionChange = new EventEmitter<boolean>();
  visibilityFlags: SectionVisibilityFlags = {
    isHomeVisible: true,
    isVerkaufVisible: true,
    isAngeboteVisible: true,
    isVermietungVisible: false,
    isLeistungenVisible: false,
    isBeratungVisible: true,
    isZusammenarbeitVisible: true,
    isFaqVisible: false,
    isKontaktVisible: true,
    isImpressumVisible: false,
    isDatenSchutzVisible: false,
    isWiderrufsbelehrungVisible: false,
  };

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef,
    private router: Router,
    private renderer: Renderer2,
    private sharedService: SharedService,
    private http: HttpClient
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const section = document.getElementById('architekten-Service');
    if (section) {
      const rect = section.getBoundingClientRect();
      const isTopAtViewport = rect.top <= 90 && rect.bottom > 0;
      this.isInSection = isTopAtViewport;
      this.sharedService.setSectionState(this.isInSection);
    }
  }

  navigateToPage(page: string, sectionId?: string) {
    // this.router.navigate([`/${page}`]);
    this.openNav = false;

    // If a section ID is provided, scroll to that element
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);

        if (!element) {
          return;
        }

        const offset = 100; // pixels above the element
        const elementTop =
          element.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth',
        });
      }, 100);
    } else {
      // Default scroll to top if no section ID provided
      window.scrollTo({
        top: 300,
        behavior: 'instant',
      });
    }
  }

  isModalOpen = false;
  selectedImage: string | null = null;

  openImageModal(imageSrc: string): void {
    this.selectedImage = imageSrc;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedImage = null;
  }

  submitForm() {
    this.loading = true;
    this.success = false;
    this.error = false;

    this.http
      .post(this.formspreeUrl, {
        name: this.form.name,
        email: this.form.email,
        subject: this.form.subject,
        message: this.form.message,
      })
      .subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
          this.form = { name: '', email: '', subject: '', message: '' };
        },
        error: () => {
          this.error = true;
          this.loading = false;
        },
      });
  }

  isVideoFile(filename: string | null): boolean {
    if (!filename) return false;
    return /\.(mp4|webm|ogg|mov|mkv)$/i.test(filename);
  }

  getTestimonialSettings(loop: boolean): any {
    return {
      speed: 600,
      loop: loop,
      autoplay: {
        delay: loop ? 2000 : 1000000,
        stopOnLastSlide: loop ? false : true,
        disableOnInteraction: true,
      },
      slidesPerView: 'auto',
      // centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 5,
          spaceBetween: 10,
        },

        1200: {
          slidesOffsetBefore: 240,
          slidesPerView: 5,
          spaceBetween: 10,
        },
      },
      observer: true,
      observeParents: true,
    };
  }

  ngAfterViewInit() {
    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
    });
    /**
     * Testimonials slider
     */

    new Swiper(
      this.testimonialSlider?.nativeElement,
      this.getTestimonialSettings(true)
    );

    new Swiper(
      this.testimonialSlider2?.nativeElement,
      this.getTestimonialSettings(true)
    );

    new Swiper(
      this.testimonialSlider3?.nativeElement,
      this.getTestimonialSettings(true)
    );

    new Swiper(
      this.testimonialSlider4?.nativeElement,
      this.getTestimonialSettings(true)
    );

    new Swiper(
      this.testimonialSlider5?.nativeElement,
      this.getTestimonialSettings(true)
    );

    new Swiper(
      this.testimonialSlider6?.nativeElement,
      this.getTestimonialSettings(true)
    );

    new Swiper(
      this.testimonialSlider7?.nativeElement,
      this.getTestimonialSettings(false)
    );

    new Swiper(
      this.testimonialSlider8?.nativeElement,
      this.getTestimonialSettings(true)
    );

    new Swiper(
      this.testimonialSlider9?.nativeElement,
      this.getTestimonialSettings(false)
    );

    new Swiper(
      this.testimonialSlider10?.nativeElement,
      this.getTestimonialSettings(true)
    );

    new Swiper(
      this.testimonialSlider11?.nativeElement,
      this.getTestimonialSettings(true)
    );

    new Swiper(
      this.testimonialSlider12?.nativeElement,
      this.getTestimonialSettings(false)
    );

    new Swiper(
      this.clientsSwipper?.nativeElement,
      this.getTestimonialSettings(true)
    );

    /**
     * Initiate portfolio lightbox
     */
    // const portfolioLightbox = GLightbox({
    //   selector: '.portfokio-lightbox',
    // });

    /**
     * Portfolio details slider
     */
    // new Swiper('.portfolio-details-slider', {
    //   speed: 400,
    //   autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    //   },
    //   pagination: {
    //     el: '.swiper-pagination',
    //     type: 'bullets',
    //     clickable: true,
    //   },
    //   observer: true,
    //   observeParents: true
    // });
    setTimeout(() => {
      // window.dispatchEvent(new Event('resize'));
    }, 0);

    new PureCounter();

    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
    });
  }

  ngOnInit(): void {
    new PureCounter();

    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
    });
  }

  /**
   * Porfolio isotope and filter
   */
  handlePortfolioFilter(e: any) {
    e.preventDefault();

    let portfolioIsotope = new Isotope(
      this.portfolioContainerRef.nativeElement,
      {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
        transitionDuration: 0,
      }
    );

    portfolioIsotope.destroy();

    // let portfolioFilters = this.select('#portfolio-flters li', true);

    // portfolioFilters.forEach(function (el: {
    //   classList: { remove: (arg0: string) => void };
    // }) {
    //   el.classList.remove('filter-active');
    // });

    // e.target.classList.add('filter-active');

    // portfolioIsotope.arrange({
    //   filter: e.target.getAttribute('data-filter'),
    // });
  }
}
