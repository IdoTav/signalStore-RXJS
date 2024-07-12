import { Component, signal, computed, untracked, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public basicSignal = signal(0);
  public computerSignal = computed(() => this.basicSignal() * 10);
  public untrackedSignal = computed(() => untracked(this.basicSignal) * 10);
  public effectSignal = signal(0);
  public message = signal('');
  constructor() {

    effect(() => {
      const currentCounter = this.basicSignal();
      this.message.update(() => `message ${currentCounter}`)
    }, {
      allowSignalWrites: true
    });
  
  }

  public setIncrement(): void {
    this.basicSignal.set(this.basicSignal() + 1);
  }

  public updateIncrement(): void {
    this.basicSignal.update(counter => counter + 1);
  }

  public effectTrigger(): void {
    this.effectSignal.update(counter => counter + 1);
  }
  
}
