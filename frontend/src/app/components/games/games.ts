import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './games.html',
  styleUrl: './games.scss'
})
export class Games implements OnInit {
  public games: any[] = [];
  public loading = true;
  public error: string | null = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3001/games').subscribe({
      next: (data) => {
        this.games = data.sort((a, b) => {
          const stripThe = (title: string) => title.replace(/^the\s+/i, '').trim();
          return stripThe(a.title).localeCompare(stripThe(b.title));
        });
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to fetch games.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
