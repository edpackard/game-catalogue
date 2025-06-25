import { Component } from '@angular/core';

@Component({
  selector: 'app-problem',
  standalone: true,
  template: `<div class="problem-container"><h2>{{ errorCode ? errorCode + ': ' : '' }}There is a problem</h2><p>Sorry, something went wrong. Please try again later.</p></div>`,
  styleUrl: './problem.scss',
})
export class Problem {
  errorCode: string | null;

  constructor() {
    const { errorCode } = history.state;
    this.errorCode = errorCode || null;
  }
} 