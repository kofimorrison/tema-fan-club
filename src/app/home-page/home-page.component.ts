import {
  Component,
  AfterViewInit,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import Isotope from 'isotope-layout';
import Swiper from 'swiper';
import PureCounter from '@srexi/purecounterjs';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

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
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  @ViewChild('portfolioContainer') portfolioContainerRef!: ElementRef;
  @ViewChild('testimonialSlider') testimonialSlider: any;
  @ViewChild('clientsSwipper') clientsSwipper: any;
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

  constructor(@Inject(ElementRef) private elementRef: ElementRef) {}

  /**
   * Easy selector helper function
   */
  select = (el: string, all = false): any => {
    el = el?.trim();
    if (all) {
      return [...(document.querySelectorAll(el) as any)];
    } else {
      return document.getElementById(el);
    }
  };
  onscroll = (el: Document, listener: { (): void; (): void; (): void }) => {
    el.addEventListener('scroll', listener);
  };

  ngAfterViewInit() {
    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
    });
    /**
     * Testimonials slider
     */
    new Swiper(this.testimonialSlider?.nativeElement, {
      speed: 600,
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
          slidesPerView: 1,
          spaceBetween: 40,
        },

        1200: {
          slidesPerView: 3,
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

    let backtotop = this.select('back-to-top');
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active');
        } else {
          backtotop.classList.remove('active');
        }
      };
      window.addEventListener('load', toggleBacktotop);
      this.onscroll(document, toggleBacktotop);
    }

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
      window.dispatchEvent(new Event('resize'));
    }, 0);

    new PureCounter();

    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
    });
  }

  ngOnInit(): void {
    if (window.history.state?.page) {
      this.navToOption(window.history.state.page);
    }

    new PureCounter();

    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
    });
  }

  scrollToElement(elementId: string, offset: number = 60) {
    const element = document.getElementById(elementId);
    if (element) {
      let elementTop = 0;
      elementTop = element.offsetTop;
      const scrollToPosition = elementTop - offset;
      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth',
      });
    }
  }

  hideAllSections() {
    Object.keys(this.visibilityFlags).forEach((key) => {
      this.visibilityFlags[key as keyof SectionVisibilityFlags] = false;
    });
  }

  navToOption(page: string, section?: string) {
    if (page === 'Home' && window.history.state?.page !== 'Home') {
      window.location.reload();
    }
    this.hideAllSections();
    this.visibilityFlags[`is${page}Visible` as keyof SectionVisibilityFlags] =
      true;

    window.history.pushState(
      {
        page: page,
      },
      page
    );

    let navbarlinks = this.select('#navbar .scrollto', true);

    navbarlinks.forEach(
      (navbarlink: {
        id: string;
        classList: {
          add: (arg0: string) => void;
          remove: (arg0: string) => void;
        };
        innerHTML: string;
      }) => {
        if (navbarlink.innerHTML == page) {
          navbarlink.classList.add('active');
        } else {
          navbarlink.classList.remove('active');
        }
      }
    );

    new PureCounter();

    setTimeout(() => {
      if (section) this.scrollToElement(section);
    }, 500);

    if (!section) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
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

    let portfolioFilters = this.select('#portfolio-flters li', true);

    portfolioFilters.forEach(function (el: {
      classList: { remove: (arg0: string) => void };
    }) {
      el.classList.remove('filter-active');
    });

    e.target.classList.add('filter-active');

    portfolioIsotope.arrange({
      filter: e.target.getAttribute('data-filter'),
    });
  }
}
