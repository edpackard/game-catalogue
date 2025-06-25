import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-game.html',
  styleUrl: './add-game.scss',
})
export class AddGame {
  gameForm: FormGroup;
  submitting = false;
  success: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      releaseYear: ['', [Validators.pattern('^[0-9]*$')]],
      labelCode: [''],
      region: [''],
      gameConsoleId: ['', Validators.required],
    });
  }

  onSubmit() {
    this.success = null;
    this.error = null;
    if (this.gameForm.invalid) {
      this.gameForm.markAllAsTouched();
      return;
    }
    
    this.submitting = true;
    const formValue = { ...this.gameForm.value };
    formValue.releaseYear = formValue.releaseYear ? Number(formValue.releaseYear) : null;
    formValue.gameConsoleId = Number(formValue.gameConsoleId);
    
    this.http.post<any>('http://localhost:3001/games', formValue).subscribe({
      next: (game) => {
        this.router.navigate([`/games/${game.id}`], { state: { success: 'Game added successfully!' } });
        this.gameForm.reset();
        this.submitting = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.submitting = false;
        this.router.navigate(['/problem'], { state: { errorCode: err.status } });
      }
    });
  }
}
