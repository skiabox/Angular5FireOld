import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output()
  public closeSidenav = new EventEmitter<void>();

  public isAuth: boolean = false;

  public authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  //methods
  public onClose(): void
  {
    this.closeSidenav.emit();
  }

  public onLogout(): void
  {
    this.authService.logout();
    this.onClose();
  }
}
