import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sectionStateSubject = new BehaviorSubject<boolean>(false);
  sectionState$ = this.sectionStateSubject.asObservable();

  setSectionState(state: boolean) {
    this.sectionStateSubject.next(state);
  }
}
