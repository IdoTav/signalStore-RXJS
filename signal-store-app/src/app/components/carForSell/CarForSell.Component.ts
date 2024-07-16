import { Component, Input } from "@angular/core";
import { Car } from "../../models/car.model";
import { CommonModule } from "@angular/common";


@Component({
    selector: 'carForSell',
    standalone: true,
    templateUrl: './CarForSell.component.html',
    imports: [CommonModule]
  })
export class CarForSellComponent {

    @Input({required: true})
    public carList!: Car[];
}