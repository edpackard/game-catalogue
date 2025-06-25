import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GameConsole, getGameConsoles } from '../../utils/gameConsoles';
import { capitaliseString } from '../../utils/capitalise-string';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './game-form.html',
  styleUrl: './game-form.scss',
})
export class GameFormComponent implements OnInit, OnChanges {
  @Input() buttonLabel = 'Submit';
  @Input() loading = false;
  @Input() initialValues: any = {};
  @Input() submitting = false;
  @Input() success: string | null = null;
  @Input() error: string | null = null;
  @Output() formSubmit = new EventEmitter<any>();

  gameForm: FormGroup;
  gameConsoles: GameConsole[] = [];
  submitAttempted = false;
  aiGenreError: string | null = null;
  aiGenreLoading = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      releaseYear: ['', [Validators.pattern('^[0-9]*$')]],
      labelCode: [''],
      region: [''],
      gameConsoleId: ['', Validators.required],
      primaryGenre: [''],
      secondaryGenre: [''],
    });
  }

  ngOnInit() {
    this.loadGameConsoles();
    if (this.initialValues) {
      this.gameForm.patchValue(this.initialValues);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialValues'] && changes['initialValues'].currentValue) {
      this.gameForm.patchValue(changes['initialValues'].currentValue);
    }
  }

  loadGameConsoles() {
    getGameConsoles(this.http, this.cdr, (consoles) => {
      this.gameConsoles = consoles;
    });
  }

  onSubmit() {
    this.submitAttempted = true;
    if (this.gameForm.invalid) {
      this.gameForm.markAllAsTouched();
      return;
    }
    this.formSubmit.emit(this.gameForm.value);
  }

  onAiGenre() {
    this.aiGenreError = null;
    const title = this.gameForm.get('title')?.value?.trim();
    const releaseYear = this.gameForm.get('releaseYear')?.value;
    const gameConsoleId = this.gameForm.get('gameConsoleId')?.value;
    let gameConsoleName = '';
    if (gameConsoleId) {
      const found = this.gameConsoles.find(c => String(c.id) === String(gameConsoleId));
      if (found) gameConsoleName = found.name;
    }
    if (!title) {
      this.aiGenreError = 'Title is required to generate genres';
      return;
    }
    this.aiGenreLoading = true;
    let params = `?title=${encodeURIComponent(title)}`;
    if (releaseYear) params += `&releaseYear=${encodeURIComponent(releaseYear)}`;
    if (gameConsoleName) params += `&gameConsole=${encodeURIComponent(gameConsoleName)}`;
    this.http.get<any>(`http://localhost:3001/ai/genres${params}`).subscribe({
      next: (res) => {
        this.gameForm.patchValue({
          primaryGenre: capitaliseString(res.primary_genre) || '',
          secondaryGenre: capitaliseString(res.secondary_genre) || ''
        });
        this.aiGenreLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.aiGenreLoading = false;
        window.location.assign('/problem');
      }
    });
  }
} 