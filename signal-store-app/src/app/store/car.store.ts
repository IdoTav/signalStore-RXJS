import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Car } from '../models/car.model';
import { computed, effect } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { loadCars } from '../data/car.data';
import { switchMap, tap } from 'rxjs';
import { withStorage } from './storage.feature';
import { withEffect } from './effect.feature';

export interface CarState {
    cars: Car[]
};

export const initialCarState: CarState = {
    cars: [] as Car[]
};

function isLocalStorageAvailable(): boolean {
    try {
        const testKey = '__test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}

export const CarStore = signalStore(
    { providedIn: 'root' },
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
            patchState(store, state => ({
                cars: [...state.cars, car]
            }));
        },
        loadCarsFromServer: rxMethod<void>(trigger$ => trigger$.pipe(
            switchMap(() => {
                return loadCars()}),
            tap(cars => patchState(store, state => ({
                cars: [...state.cars, ...cars]
            })))
        ))
    })),
    
    /*
    withHooks(store => ({
        onInit: () => {
            if (isLocalStorageAvailable()) {
                const state = localStorage.getItem('car');
                if (state) {
                    patchState(store, JSON.parse(state));
                }
                effect(() => {
                    localStorage.setItem('car', JSON.stringify(getState(store)));
                });
            }
        }
    })),
    
    withStorage('car'),
    withEffect(),
    */
);
