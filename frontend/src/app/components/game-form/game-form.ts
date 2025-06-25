import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GameConsole, getGameConsoles } from '../../utils/gameConsoles';

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

  constructor(private fb: FormBuilder, private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      releaseYear: ['', [Validators.pattern('^[0-9]*$')]],
      labelCode: [''],
      region: [''],
      gameConsoleId: ['', Validators.required],
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
    if (this.gameForm.invalid) {
      this.gameForm.markAllAsTouched();
      return;
    }
    this.formSubmit.emit(this.gameForm.value);
  }
} 