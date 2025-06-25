import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { GameFormComponent } from '../game-form';

@Component({
  selector: 'app-update-game',
  standalone: true,
  imports: [GameFormComponent],
  template: `
    <app-game-form
      [buttonLabel]="'Update Game'"
      [submitting]="submitting"
      [loading]="loading"
      [success]="success"
      [error]="error"
      [initialValues]="initialValues"
      (formSubmit)="onSubmit($event)"
    ></app-game-form>
  `
})
export class UpdateGame implements OnInit {
  submitting = false;
  success: string | null = null;
  error: string | null = null;
  loading = true;
  initialValues: any = {};

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'No game ID provided.';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }
    this.http.get<any>(`http://localhost:3001/games/${id}`).subscribe({
      next: (game) => {
        this.initialValues = {
          title: game.title,
          releaseYear: game.releaseYear ?? '',
          labelCode: game.labelCode ?? '',
          region: game.region ?? '',
          gameConsoleId: game.gameConsoleId ?? '',
          primaryGenre: game.primaryGenre ?? '',
          secondaryGenre: game.secondaryGenre ?? ''
        };
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.cdr.detectChanges();
        this.router.navigate(['/problem'], { state: { errorCode: err.status } });
      }
    });
  }

  onSubmit(formValue: any) {
    this.success = null;
    this.error = null;
    if (this.loading) return;
    this.submitting = true;
    const id = this.route.snapshot.paramMap.get('id');
    formValue.releaseYear = formValue.releaseYear ? Number(formValue.releaseYear) : null;
    formValue.gameConsoleId = Number(formValue.gameConsoleId);
    formValue.primaryGenre = formValue.primaryGenre || '';
    formValue.secondaryGenre = formValue.secondaryGenre || '';
    this.http.put(`http://localhost:3001/games/${id}`, formValue).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate([`/games/${id}`], { state: { success: 'Game updated successfully!' } });
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.submitting = false;
        this.router.navigate(['/problem'], { state: { errorCode: err.status } });
      }
    });
  }
}
