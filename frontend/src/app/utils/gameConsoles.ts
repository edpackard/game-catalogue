import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

export interface GameConsole {
  id: number;
  name: string;
  manufacturer: string;
}

export function getGameConsoles(
  http: HttpClient, 
  cdr: ChangeDetectorRef, 
  onSuccess: (consoles: GameConsole[]) => void = () => {}
): void {
  http.get<GameConsole[]>('http://localhost:3001/gameConsoles').subscribe({
    next: (consoles) => {
      onSuccess(consoles);
      cdr.detectChanges();
    },
    error: (err) => {
      console.error('Failed to load game consoles:', err);
      cdr.detectChanges();
    }
  });
} 