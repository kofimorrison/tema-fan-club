import { Component, AfterViewInit, OnInit, HostListener, ViewChild, ElementRef, Inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Isotope from 'isotope-layout';
import AOS from 'aos';
import Swiper from 'swiper';
import GLightbox from 'glightbox';
import PureCounter from '@srexi/purecounterjs';
import { CommonModule } from '@angular/common';
// import { SwiperModule } from 'ngx-swiper-wrapper';
// import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

type SectionVisibilityFlags = {
  [K in 'isHomeVisible' | 'isVerkaufVisible' | 'isVermietungVisible' | 'isLeistungenVisible' | 'isBeratungVisible' | 'isZusammenarbeitVisible' | 'isAngeboteVisible' | 'isKontaktVisible']: boolean;
};

// const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   slidesPerView: 'auto'
// };

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  providers: [
    // {
    //   provide: SWIPER_CONFIG,
    //   useValue: DEFAULT_SWIPER_CONFIG
    // }
  ],
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
    isKontaktVisible: false
  };
  // isHomeVisible: boolean = true;
  // isVerkaufVisible: boolean = false;
  // isVermietungVisible: boolean = false;
  // isLeistungenVisible: boolean = false;
  // isBeratungVisible: boolean = false;
  // isZusammenarbeitVisible: boolean = false;
  swiper: any;
  image: string | undefined;
  // Can bind 4th img tag
  // image: string = 'https://source.unsplash.com/random/512x512?portrait';

  public swipeOptions = {
    spaceBetween: 0,
    loop: true,
    speed: 1000,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
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
  onscroll = (
    el: Document,
    listener: { (): void; (): void; (): void }
  ) => {
    el.addEventListener('scroll', listener);
  };

  ngAfterViewInit() {
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
      observer: true, observeParents: true
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
      observer: true, observeParents: true
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  ngOnInit(): void {
    if (window.history.state?.page) {
      this.navToOption(window.history.state.page);
    }

    /**
     * Easy on scroll event listener
     */
    // const onscroll = (el: Document, listener: { (): void; (): void; (): void }) => {
    //   el.addEventListener('scroll', listener);
    // };

    /**
     * Navbar links active state on scroll
     */
    // let navbarlinks = this.select('#navbar .scrollto', true);

    // const navbarlinksActive = () => {
    //   let position = window.scrollY + 100;
    //   navbarlinks.forEach(
    //     (navbarlink: {
    //       id: string;
    //       classList: {
    //         add: (arg0: string) => void;
    //         remove: (arg0: string) => void;
    //       };
    //     }) => {
    //       if (!navbarlink.id) return;
    //       let section = this.select(navbarlink.id.split('nav-')[1]);
    //       if (!section) return;
    //       if (
    //         position >= section.offsetTop &&
    //         position <= section.offsetTop + section.offsetHeight
    //       ) {
    //         navbarlink.classList.add('active');
    //       } else {
    //         navbarlink.classList.remove('active');
    //       }
    //     }
    //   );
    // };

    new PureCounter();

    // window.addEventListener('load', navbarlinksActive);
    // onscroll(document, navbarlinksActive);

    // window.scrollTo({
    //       top: 0,
    //       behavior: 'smooth',
    //     });
  }

  scrollToElement(elementId: string, offset: number = 0, hasparent?: boolean) {
    // const element = document.getElementById(elementId);
    // if (element) {
    //   let elementTop = 0;
    //   if (hasparent) {
    //     elementTop = (element.getBoundingClientRect().top + window.scrollY);
    //     console.log(elementTop)
    //   } else {
    //     elementTop = element.offsetTop;
    //   }
    //     const scrollToPosition = elementTop - offset;
    //     // console.log(element.offsetTop)

    //     window.scrollTo({
    //         top: scrollToPosition,
    //         behavior: 'smooth'
    //     });

    //     window.history.pushState({
    //       top: scrollToPosition
    //   }, elementId)
    // }
  }

  hideAllSections() {
    Object.keys(this.visibilityFlags).forEach(key => {
      this.visibilityFlags[key as keyof SectionVisibilityFlags] = false;
    });
  }

  navToOption(section: string) {

    if ((section === 'Home' && window.history.state?.page !== 'Home') || (section === 'Vermietung' && window.history.state?.page !== 'Vermietung')) {
      window.location.reload();
    }
    this.hideAllSections();
    this.visibilityFlags[`is${section}Visible` as keyof SectionVisibilityFlags] = true;

    window.history.pushState({
      page: section,
    }, section);

    let navbarlinks = this.select('#navbar .scrollto', true);

    navbarlinks.forEach(
      (navbarlink: {
        id: string;
        classList: {
          add: (arg0: string) => void;
          remove: (arg0: string) => void;
        };
        innerHTML: string
      }) => {
        console.log(section)
        if (navbarlink.innerHTML == section) {
          navbarlink.classList.add('active');
        } else {
          navbarlink.classList.remove('active');
        }
      }
    )

    new PureCounter();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
       * Porfolio isotope and filter
       */
  handlePortfolioFilter(e: any) {
    e.preventDefault();

    let portfolioIsotope = new Isotope(this.portfolioContainerRef.nativeElement, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows',
      transitionDuration: 0
    });

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

    // AOS.init({
    //   duration: 700,
    //   easing: 'ease-in-out',
    //   once: false,
    //   mirror: false,
    // });
  }
}
