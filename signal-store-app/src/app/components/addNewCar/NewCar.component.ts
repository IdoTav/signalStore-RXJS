import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CarStore } from "../../store/car.store";
import { Car } from "../../models/car.model";


@Component({
    selector: 'addNewCar',
    standalone: true,
    templateUrl: './NewCar.component.html',
    imports: [CommonModule]
  })
export class AddNewCar {
  readonly carStore = inject(CarStore);

  public addNewCar(): void {
    const newCar: Car = {km: 100, carCompany: 'mazda', ownerId: 316222512, model: '3', isForSell: true};
    this.carStore.addCar(newCar);
  }
}