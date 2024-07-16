import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Car } from '../models/car.model';
import { computed } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { loadCars } from '../data/car.data';
import { map, switchMap, tap } from 'rxjs';

export interface CarState {
    cars: Car[]
};

export const initialCarState: CarState = {
    cars: [] as Car[]
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
    })),
    withMethods(store => ({
        addCar: (car: Car) => {
            patchState(store ,state => ({
                cars: [...state.cars, car]
            }))
        },
        loadCarsFromServer: rxMethod<void>(trigger$ => trigger$.pipe(
            switchMap(() => loadCars()),
            tap(cars => patchState(store, state => ({
                cars: [...state.cars, ...cars]
            })))
        ))
    })),/*
    withHooks(store => ({
        onInit: () => {
            store.loadCarsFromServer()
        }
    })),
    */
)
