import { getState, patchState, signalStoreFeature, withHooks, withMethods } from "@ngrx/signals";
import { Car } from "../models/car.model";
import { switchMap, tap } from "rxjs";
import { loadCars } from "../data/car.data";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { CarState } from "./car.store";



export function withEffect() {
    return signalStoreFeature(
        withMethods(store => ({
            addCar: (car: Car) => {
                patchState(store, (state: CarState) => ({
                    cars: [...state.cars, car]
                }));
            },
            loadCarsFromServer: rxMethod<void>(trigger$ => trigger$.pipe(
                switchMap(() => {
                    return loadCars()}),
                tap(cars => patchState(store, (state: CarState) => ({
                    cars: [...state.cars, ...cars]
                })))
            ))
        }))
    );
}