import { signalStore, withComputed, withState } from '@ngrx/signals';
import { Car } from '../models/car.model';
import {CARS} from '../data/car.data';
import { computed } from '@angular/core';

export interface CarState {
    cars: Car[]
};

export const initialCarState: CarState = {
    cars: CARS
};

export const CarStore = signalStore(
     { providedIn: 'root'},
    withState(initialCarState),
    withComputed(store => ({
        allCars: computed(() => store.cars()),
        findCarByOwnerId: computed(() => {
            return (ownerId: number) => {
                
                return store.cars().filter(car => car.ownerId === ownerId);
            }
        }),
        findAllCarsForSale: computed(() => store.cars().filter(car => car.isForSell)),

    })),
    withComputed(store => ({
        numberOfCars: computed(() => store.allCars().length)
    }))
)