import { Component, Input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CarStore } from "../../store/car.store";


@Component({
    selector: 'carForSell',
    standalone: true,
    templateUrl: './CarForSell.component.html',
    imports: [CommonModule]
  })
export class CarForSellComponent {
  readonly carStore = inject(CarStore);
}