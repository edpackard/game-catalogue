import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { GameFormComponent } from '../game-form';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [GameFormComponent],
  template: `
    <app-game-form
      [buttonLabel]="'Add Game'"
      [submitting]="submitting"
      [success]="success"
      [error]="error"
      (formSubmit)="onSubmit($event)"
    ></app-game-form>
  `
})
export class AddGame {
  submitting = false;
  success: string | null = null;
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(formValue: any) {
    this.success = null;
    this.error = null;
    this.submitting = true;
    formValue.releaseYear = formValue.releaseYear ? Number(formValue.releaseYear) : null;
    formValue.gameConsoleId = Number(formValue.gameConsoleId);
    this.http.post<any>('http://localhost:3001/games', formValue).subscribe({
      next: (game) => {
        this.router.navigate([`/games/${game.id}`], { state: { success: 'Game added successfully!' } });
        this.submitting = false;
      },
      error: (err: HttpErrorResponse) => {
        this.submitting = false;
        this.router.navigate(['/problem'], { state: { errorCode: err.status } });
      }
    });
  }
}
