import { Component, AfterViewInit, OnInit, HostListener, ViewChild, ElementRef, Inject } from '@angular/core';
import Isotope from 'isotope-layout';
import AOS from 'aos';
import Swiper from 'swiper';
import GLightbox from 'glightbox';
import PureCounter from '@srexi/purecounterjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, AfterViewInit {
  @ViewChild('portfolioContainer') portfolioContainerRef!: ElementRef;
  @ViewChild('testimonialSlider') testimonialSlider: any
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

  ngAfterViewInit() {
    /**
     * Testimonials slider
     */
    new Swiper(this.testimonialSlider.nativeElement, {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
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
    // const nativeElement = this.elementRef.nativeElement;
    // console.log(this.testimonialSlider.nativeElement)
    // this.swiper = new Swiper(this.testimonialSlider.nativeElement, this.swipeOptions);


    // AOS.init({
    //   duration: 700,
    //   easing: 'ease-in-out',
    //   once: false,
    //   mirror: false,
    // });

    new Swiper('.clients-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
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

    /**
     * Initiate portfolio lightbox
     */
    const portfolioLightbox = GLightbox({
      selector: '.portfokio-lightbox',
    });

    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      observer: true,
      observeParents: true
    });


  }

  ngOnInit(): void {
    /**
     * Clients Slider
     */
    // new Swiper('.clients-slider', {
    //   speed: 400,
    //   loop: true,
    //   autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    //   },
    //   slidesPerView: 'auto',
    //   pagination: {
    //     el: '.swiper-pagination',
    //     type: 'bullets',
    //     clickable: true,
    //   },
    //   breakpoints: {
    //     320: {
    //       slidesPerView: 2,
    //       spaceBetween: 40,
    //     },
    //     480: {
    //       slidesPerView: 3,
    //       spaceBetween: 60,
    //     },
    //     640: {
    //       slidesPerView: 4,
    //       spaceBetween: 80,
    //     },
    //     992: {
    //       slidesPerView: 6,
    //       spaceBetween: 120,
    //     },
    //   },
    //   observer: true, observeParents: true
    // });

    // /**
    //  * Initiate portfolio lightbox
    //  */
    // const portfolioLightbox = GLightbox({
    //   selector: '.portfokio-lightbox',
    // });

    // /**
    //  * Portfolio details slider
    //  */
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

    // /**
    //  * Testimonials slider
    //  */
    // new Swiper('.testimonials-slider', {
    //   speed: 600,
    //   loop: true,
    //   autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    //   },
    //   slidesPerView: 'auto',
    //   pagination: {
    //     el: '.swiper-pagination',
    //     type: 'bullets',
    //     clickable: true,
    //   },
    //   breakpoints: {
    //     320: {
    //       slidesPerView: 1,
    //       spaceBetween: 40,
    //     },

    //     1200: {
    //       slidesPerView: 3,
    //     },
    //   },
    //   observer: true, observeParents: true
    // });

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el: Document, listener: { (): void; (): void; (): void }) => {
      el.addEventListener('scroll', listener);
    };

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = this.select('#navbar .scrollto', true);

    const navbarlinksActive = () => {
      let position = window.scrollY + 100;
      navbarlinks.forEach(
        (navbarlink: {
          id: string;
          classList: {
            add: (arg0: string) => void;
            remove: (arg0: string) => void;
          };
        }) => {
          if (!navbarlink.id) return;
          let section = this.select(navbarlink.id.split('nav-')[1]);
          if (!section) return;
          if (
            position >= section.offsetTop &&
            position <= section.offsetTop + section.offsetHeight
          ) {
            navbarlink.classList.add('active');
          } else {
            navbarlink.classList.remove('active');
          }
        }
      );
    };

    new PureCounter();

    window.addEventListener('load', navbarlinksActive);
    onscroll(document, navbarlinksActive);
  }

  scrollToElement(elementId: string, offset: number = 0, hasparent?: boolean) {
    const element = document.getElementById(elementId);
    if (element) {
      let elementTop = 0;
      if (hasparent) {
        elementTop = (element.getBoundingClientRect().top + window.scrollY);
        console.log(elementTop)
      } else {
        elementTop = element.offsetTop;
      }
        const scrollToPosition = elementTop - offset;
        // console.log(element.offsetTop)

        window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth'
        });

        window.history.pushState({
          top: scrollToPosition
      }, elementId)
    }
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
