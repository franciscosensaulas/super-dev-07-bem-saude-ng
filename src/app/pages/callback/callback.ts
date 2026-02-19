import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { filter } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.html',
  styleUrl: './callback.scss',
})
export class Callback {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.auth.isAuthenticated$.pipe(
      filter((isAuthenticated) => isAuthenticated),
      take(1)
    ).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
