import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarStore } from './store/car.store';
import { CarForSellComponent } from "./components/carForSell/CarForSell.Component";
import { Car } from './models/car.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarForSellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly carStore = inject(CarStore);

  constructor() {}

  public onDivClick(): void {
    const newCar: Car = {km: 100, carCompany: 'mazda', ownerId: 316222512, model: '3', isForSell: true};
    this.carStore.loadCarsFromServer();
  }

}
