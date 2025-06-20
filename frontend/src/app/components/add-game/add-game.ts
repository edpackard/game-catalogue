import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      releaseYear: ['', [Validators.pattern('^[0-9]*$')]],
      labelCode: [''],
      region: [''],
    });
  }

  onSubmit() {
    this.success = null;
    this.error = null;
    if (this.gameForm.invalid) return;
    this.submitting = true;
    const formValue = { ...this.gameForm.value };
    formValue.releaseYear = formValue.releaseYear ? Number(formValue.releaseYear) : null;
    this.http.post('http://localhost:3001/games', formValue).subscribe({
      next: () => {
        this.success = 'Game added successfully!';
        this.gameForm.reset();
        this.submitting = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to add game.';
        this.submitting = false;
      }
    });
  }
}
