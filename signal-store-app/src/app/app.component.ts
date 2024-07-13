import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarStore } from './store/car.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly carStore = inject(CarStore);

  constructor() {}

  public onDivClick(): void {
    console.log(this.carStore.findCarByOwnerId()(316222512));
  }

}
