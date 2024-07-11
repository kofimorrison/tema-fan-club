import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GLightbox from 'glightbox';
import PureCounter from '@srexi/purecounterjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './home-page/home-page.component.css'],
  imports: [RouterOutlet, HomePageComponent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'rosen-stolz-app';

  scrollRef = 0;
  openNav: boolean = false;

  constructor(private router: Router) {}

  toggleNav() {
    this.openNav = !this.openNav;
  }

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
       * Back to top button
       */
      let backtotop = select('.back-to-top');
      if (backtotop) {
        // const toggleBacktotop = () => {
        //   if (window.scrollY > 100) {
        //     backtotop.classList.add('active');
        //   } else {
        //     backtotop.classList.remove('active');
        //   }
        // };
        // window.addEventListener('load', toggleBacktotop);
        // onscroll(document, toggleBacktotop);
      }

      // /**
      //  * Initiate portfolio lightbox
      //  */
      const portfolioLightbox = GLightbox({
        selector: '.portfokio-lightbox',
      });
    })();
    new PureCounter();
  }

  navigateToPage(page: string) {
    this.router.navigate([`/${page}`]);
    this.openNav = false;
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }
}
