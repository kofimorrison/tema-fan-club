import { Component } from '@angular/core';
import { MapComponent } from "../map/map.component";
import { environment } from '../../environments/environment';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-contact',
    standalone: true,
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss', '../home-page/home-page.component.css'],
    imports: [MapComponent, FormsModule, HttpClientModule]
})
export class ContactComponent {
  formAction: string = 'http://localhost/contact.php';
  model: any = {};
  contactForm: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if (environment.production) {
      this.formAction = '/assets/js/vendor/php-email-form/contact.php';
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("name", this.model.name);
    formData.append("email", this.model.email);
    formData.append("subject", this.model.subject);
    formData.append("message", this.model.message);

    const headers = { 'X-Requested-With': 'XMLHttpRequest' }; ;

    this.http.post(this.formAction, formData, { headers: headers }).subscribe(
      response => {
        console.log('Email sent successfully', response);
        document.querySelector('.sent-message')?.classList.add('d-block');
        document.querySelector('.error-message')?.classList.remove('d-block');
      },
      error => {
        if (error.status === 200) {
          console.log('Email sent successfully', error);
          document.querySelector('.sent-message')?.classList.add('d-block');
          document.querySelector('.error-message')?.classList.remove('d-block');
        } else {
        document.querySelector('.error-message')?.classList.add('d-block');
        document.querySelector('.sent-message')?.classList.remove('d-block');
        }
      }
    );
  }
}
