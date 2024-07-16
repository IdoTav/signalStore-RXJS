import { Observable, delay, map, of } from "rxjs";
import { Car } from "../models/car.model";

export const CARS: Car[] = [
    {
        carCompany: 'Toyota',
        km: 0,
        model: 'Corola',
        isForSell: true,
        ownerId: 316222512
    },
    {
        carCompany: 'Audi',
        km: 13231,
        model: 'Q7',
        isForSell: false,
        ownerId: 312333682
    },
    {
        carCompany: 'Volkswagen',
        km: 10321,
        model: 'Golf',
        isForSell: true,
        ownerId: 684333912
    },
    {
        carCompany: 'Mitsubishi',
        km: 32131,
        model: 'Outlander',
        isForSell: true,
        ownerId: 316222512
    },
    {
        carCompany: 'Kia',
        km: 132,
        model: 'Picanto',
        isForSell: false,
        ownerId: 316222512
    },
    {
        carCompany: 'Toyota',
        km: 0,
        model: 'Seltos',
        isForSell: false,
        ownerId: 316313512
    }
]

export function loadCars(): Observable<Car[]> {
    return of(1).pipe(
        map(_ => CARS),
        delay(3000)
    )
}

