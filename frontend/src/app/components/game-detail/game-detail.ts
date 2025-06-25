import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.scss'
})
export class GameDetail implements OnInit {
  public game: any = null;
  public loading = true;
  public error: string | null = null;
  public deleting = false;
  public showDeleteConfirm = false;
  public success: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    // Read navigation state for messages (works after redirect)
    const { success, error } = history.state;
    if (success) this.success = success;
    if (error) this.error = error;
    if (success || error) {
      setTimeout(() => {
        this.success = null;
        this.error = null;
        // Clear state from browser history so reload doesn't show it again
        window.history.replaceState({}, '', window.location.pathname);
        this.cdr.detectChanges();
      }, 3000);
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = this.error || 'No game ID provided.';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }
    this.http.get<any>(`http://localhost:3001/games/${id}`).subscribe({
      next: (data) => {
        this.game = data;
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

  onDelete() {
    this.showDeleteConfirm = true;
    this.cdr.detectChanges();
  }

  confirmDelete() {
    if (!this.game?.id || this.deleting) return;
    this.deleting = true;
    this.http.delete(`http://localhost:3001/games/${this.game.id}`).subscribe({
      next: () => {
        this.router.navigate(['/games'], { state: { success: 'Game deleted successfully!' } });
      },
      error: (err) => {
        this.deleting = false;
        this.cdr.detectChanges();
        this.router.navigate(['/problem'], { state: { errorCode: err.status } });
      }
    });
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
    this.cdr.detectChanges();
  }
}
