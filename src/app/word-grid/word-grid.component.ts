import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-word-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-grid.component.html',
  styleUrl: './word-grid.component.scss'
})
export class WordGridComponent {
  phrases = [
    { text: 'Rosen', offset: 23 },
    { text: 'Organisiert', offset: 23 },
    { text: 'Spezialisten', offset: 23 },
    { text: 'Beratung', offset: 22 },
    { text: 'Begleitung', offset: 15 },
    { text: 'Exposès', offset: 19 },
    { text: 'Wertermittlung', offset: 20 },
    { text: 'Professionell', offset: 21 },
    { text: 'Zuverlässigkeit', offset: 18 },
    { text: 'Stolz', offset: 19 }
  ];

  xx(data: any) {
    console.log(data)
    return data;
  }

  getEmptyCells(count: number) {
    return new Array(Math.max(0, count));
  }
}
