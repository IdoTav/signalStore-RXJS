import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarStore } from './store/car.store';
import { CarForSellComponent } from "./components/carForSell/CarForSell.Component";
import { AddNewCar } from "./components/addNewCar/NewCar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarForSellComponent, AddNewCar, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly carStore = inject(CarStore);

  constructor() {}

  public loadCars(): void {
    this.carStore.loadCarsFromServer();
  }

}
