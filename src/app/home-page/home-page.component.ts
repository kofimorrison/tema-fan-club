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
import AOS from 'aos';
import '../../assets/js/vendor/aos/aos.css';
import Swiper from 'swiper';
import GLightbox from 'glightbox';
import PureCounter from '@srexi/purecounterjs';
import { CommonModule } from '@angular/common';
import { HeroImage } from '../heroImage/heroImage.component';
import { WordGridComponent } from '../word-grid/word-grid.component';
import { MapComponent } from '../map/map.component';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

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
    | 'isImpressumVisible'
    | 'isDatenSchutzVisible'
    | 'isWiderrufsbelehrungVisible']: boolean;
};

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HeroImage, MapComponent, WordGridComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css', '../../assets/js/vendor/aos/aos.css'],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  formAction: string = 'http://localhost/contact.php';
  @ViewChild('portfolioContainer') portfolioContainerRef!: ElementRef;
  @ViewChild('testimonialSlider') testimonialSlider: any;
  @ViewChild('clientsSwipper') clientsSwipper: any;
  isInSection = false;
  @Output() sectionChange = new EventEmitter<boolean>();
  visibilityFlags: SectionVisibilityFlags = {
    isHomeVisible: true,
    isVerkaufVisible: false,
    isAngeboteVisible: false,
    isVermietungVisible: false,
    isLeistungenVisible: false,
    isBeratungVisible: false,
    isZusammenarbeitVisible: false,
    isKontaktVisible: false,
    isImpressumVisible: false,
    isDatenSchutzVisible: false,
    isWiderrufsbelehrungVisible: false,
  };

  constructor(@Inject(ElementRef) private elementRef: ElementRef, private router: Router, private renderer: Renderer2, private sharedService: SharedService) {}

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

  navigateToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }

  ngAfterViewInit() {

    this.initializeFormHandling();
    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
    });
    /**
     * Testimonials slider
     */
    new Swiper(this.testimonialSlider?.nativeElement, {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 2000,
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
    });

    new Swiper(this.clientsSwipper?.nativeElement, {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 60,
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 80,
        },
        992: {
          slidesPerView: 6,
          spaceBetween: 120,
        },
      },
      observer: true,
      observeParents: true,
    });

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

  initializeFormHandling() {
    "use strict";

    let forms = document.querySelectorAll('.php-email-form');

    forms.forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        let thisForm = form as HTMLFormElement;


        let action = thisForm.getAttribute('action');

        let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

        if (!action) {
          this.displayError(thisForm, 'The form action property is not set!');
          return;
        }
        thisForm.querySelector('.loading')?.classList.add('d-block');
        thisForm.querySelector('.error-message')?.classList.remove('d-block');
        thisForm.querySelector('.sent-message')?.classList.remove('d-block');

        let formData = new FormData(thisForm);

        if (recaptcha) {
          if (typeof recaptcha !== "undefined") {
            (recaptcha as any).ready(() => {
              try {
                (recaptcha as any).execute(recaptcha, { action: 'php_email_form_submit' })
                  .then((token: string | Blob) => {
                    formData.set('recaptcha-response', token);
                    this.phpEmailFormSubmit(thisForm, action, formData);
                  });
              } catch (error) {
                this.displayError(thisForm, error);
              }
            });
          } else {
            this.displayError(thisForm, 'The reCaptcha javascript API url is not loaded!');
          }
        } else {
          this.phpEmailFormSubmit(thisForm, action, formData);
        }
      });
    });
  }

  phpEmailFormSubmit(thisForm: HTMLFormElement, action: string, formData: FormData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(`${response.status} ${response.statusText} ${response.url}`);
        }
      })
      .then(data => {
        thisForm.querySelector('.loading')?.classList.remove('d-block');
        if (data.trim() === 'OK') {
          thisForm.querySelector('.sent-message')?.classList.add('d-block');
          thisForm.reset();
        } else {
          throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action);
        }
      })
      .catch((error) => {
        this.displayError(thisForm, error);
      });
  }

  displayError(thisForm: HTMLFormElement, error: any) {
    thisForm.querySelector('.loading')?.classList.remove('d-block');
    thisForm.querySelector('.error-message')!.innerHTML = error;
    thisForm.querySelector('.error-message')?.classList.add('d-block');
  }


  ngOnInit(): void {
    if (environment.production) {
      this.formAction = '/assets/js/vendor/php-email-form/contact.php';
    }

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
  // handlePortfolioFilter(e: any) {
  //   e.preventDefault();

  //   let portfolioIsotope = new Isotope(
  //     this.portfolioContainerRef.nativeElement,
  //     {
  //       itemSelector: '.portfolio-item',
  //       layoutMode: 'fitRows',
  //       transitionDuration: 0,
  //     }
  //   );

  //   portfolioIsotope.destroy();

  //   let portfolioFilters = this.select('#portfolio-flters li', true);

  //   portfolioFilters.forEach(function (el: {
  //     classList: { remove: (arg0: string) => void };
  //   }) {
  //     el.classList.remove('filter-active');
  //   });

  //   e.target.classList.add('filter-active');

  //   portfolioIsotope.arrange({
  //     filter: e.target.getAttribute('data-filter'),
  //   });
  // }
}
