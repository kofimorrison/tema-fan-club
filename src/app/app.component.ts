import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GLightbox from 'glightbox';
import PureCounter from '@srexi/purecounterjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, HomePageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'rosen-stolz-app';

  scrollRef = 0;

  constructor() {}

  ngOnInit(): void {
    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
    });

    /**
     * Easy selector helper function
     */
    const select = (el: string, all = false): any => {
      el = el?.trim();
      if (all) {
        return [...(document.querySelectorAll(el) as any)];
      } else {
        return document.getElementById(el);
      }
    };

    /**
     * Easy on scroll event listener
     */
    const onscroll = (
      el: Document,
      listener: { (): void; (): void; (): void }
    ) => {
      el.addEventListener('scroll', listener);
    };
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el: string) => {
      let header = select('#header');
      let offset = header.offsetHeight;

      if (!header.classList.contains('header-scrolled')) {
        offset -= 10;
      }

      let elementPos = select(el).offsetTop;
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth',
      });
    };

    (function () {
      /**
       * Easy selector helper function
       */
      const select = (el: string, all = false): any => {
        el = el?.trim();
        if (all) {
          return [...(document.querySelectorAll(el) as any)];
        } else {
          return document.querySelector(el);
        }
      };

      /**
       * Easy event listener function
       */
      const on = (
        type: string,
        el: string,
        listener: { (e: any): void; (e: any): void; (e: any): void },
        all = false
      ) => {
        if (all) {
          select(el, all).forEach(
            (e: {
              addEventListener: (
                arg0: string,
                arg1: { (e: any): void; (e: any): void; (e: any): void }
              ) => any;
            }) => e.addEventListener(type, listener)
          );
        } else {
          select(el, all).addEventListener(type, listener);
        }
      };

      /**
       * Toggle .header-scrolled class to #header when page is scrolled
       */
      let selectHeader = select('#header');
      if (selectHeader) {
        const headerScrolled = () => {
          if (window.scrollY > 100) {
            selectHeader.classList.add('header-scrolled');
          } else {
            selectHeader.classList.remove('header-scrolled');
          }
        };
        window.addEventListener('load', headerScrolled);
        onscroll(document, headerScrolled);
      }

      /**
       * Back to top button
       */
      let backtotop = select('.back-to-top');
      if (backtotop) {
        const toggleBacktotop = () => {
          if (window.scrollY > 100) {
            backtotop.classList.add('active');
          } else {
            backtotop.classList.remove('active');
          }
        };
        window.addEventListener('load', toggleBacktotop);
        onscroll(document, toggleBacktotop);
      }

      /**
       * Mobile nav toggle
       */
      on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile');
        e.target.classList.toggle('bi-list');
        e.target.classList.toggle('bi-x');
      });

      /**
       * Mobile nav dropdowns activate
       */
      on(
        'click',
        '.navbar .dropdown > a',
        function (e) {
          if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault();
            // select('#navbar').classList.toggle('bi-list');
            select('#navbar').classList.toggle('navbar-mobile');
            select('#navbar').classList.toggle('bi-list');
            // e.target.nextElementSibling.classList.toggle('dropdown-active');
            window.location.reload();
          }
        },
        true
      );

      /**
       * Scrool with ofset on links with a class name .scrollto
       */
      on(
        'click',
        '.scrollto',
        function (e) {
          if (select(e.hash)) {
            e.preventDefault();

            let navbar = select('#navbar');
            if (navbar.classList.contains('navbar-mobile')) {
              navbar.classList.remove('navbar-mobile');
              let navbarToggle = select('.mobile-nav-toggle');
              navbarToggle.classList.toggle('bi-list');
              navbarToggle.classList.toggle('bi-x');
            }
            scrollto(e.hash);
          }
        },
        true
      );

      // /**
      //  * Initiate portfolio lightbox
      //  */
      const portfolioLightbox = GLightbox({
        selector: '.portfokio-lightbox',
      });

      /**
       * Initiate Pure Counter
       */
    })();
    new PureCounter();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
