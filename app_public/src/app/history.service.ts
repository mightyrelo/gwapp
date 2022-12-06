import { Injectable } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private urls: string[] = [];

  constructor(
    private router: Router
  ) { 
    this.router.events
      .pipe(filter(routerEvent => routerEvent instanceof NavigationEnd))
      .subscribe((routerEvent: NavigationEnd) => {
        let url : string = routerEvent.urlAfterRedirects;
        this.urls.push(url);
      });
  }

  public getPreviousUrl(): string {
    const length = this.urls.length;
    return length > 1 ? this.urls[length-2] : '/'; 
  }

  public getLastNonLoginUrl(): string {
    const exclude: string[] = ['/login', '/register'];
    const filtered = this.urls.filter(url => !exclude.includes(url));
    const length = filtered.length;
    return length > 1 ? filtered[length -1] : '/';
  }
}
