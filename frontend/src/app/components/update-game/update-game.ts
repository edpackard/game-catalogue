import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-game',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-game.html',
  styleUrl: './update-game.scss',
})
export class UpdateGame implements OnInit {
  gameForm: FormGroup;
  submitting = false;
  success: string | null = null;
  error: string | null = null;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      releaseYear: [''],
      labelCode: [''],
      region: [''],
    });
  }

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
        this.gameForm.patchValue({
          title: game.title,
          releaseYear: game.releaseYear ?? '',
          labelCode: game.labelCode ?? '',
          region: game.region ?? ''
        });
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to fetch game.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit() {
    this.success = null;
    this.error = null;
    if (this.gameForm.invalid) return;
    this.submitting = true;
    const id = this.route.snapshot.paramMap.get('id');
    const formValue = { ...this.gameForm.value };
    formValue.releaseYear = formValue.releaseYear ? Number(formValue.releaseYear) : null;
    this.http.put(`http://localhost:3001/games/${id}`, formValue).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate([`/games/${id}`], { state: { success: 'Game updated successfully!' } });
      },
      error: (err) => {
        this.submitting = false;
        this.router.navigate([`/games/${id}`], { state: { error: err.error?.error || 'Failed to update game.' } });
        this.cdr.detectChanges();
      }
    });
  }
}
