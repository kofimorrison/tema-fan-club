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
    { text: 'Rosenstolz Immo', offset: 23 },
    { text: 'O', offset: 23 },
    { text: 'Spezialisten', offset: 23 },
    { text: 'Beratung und', offset: 22 },
    { text: 'BegleitunNg', offset: 14 },
    { text: 'Aussagekräftige ExpoSès', offset: 3 },
    { text: 'Marktgerechte WertTermittlung', offset: 5 },
    { text: 'PrOfessionalität', offset: 21 },
    { text: 'Leidenschaft', offset: 23 },
    { text: 'Zuverlässigkeit', offset: 23 }
  ];

  xx(data: any) {
    console.log(data)
    return data;
  }

  getEmptyCells(count: number) {
    return new Array(Math.max(0, count));
  }
}
