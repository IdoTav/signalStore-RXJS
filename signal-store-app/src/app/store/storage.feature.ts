import { effect } from "@angular/core";
import { getState, patchState, signalStoreFeature, withHooks } from "@ngrx/signals";

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

export function withStorage(key: string) {
    return signalStoreFeature(
        withHooks(store => ({
            onInit: () => {
                if(isLocalStorageAvailable()) {
                const state = localStorage.getItem(key);
                if (state) {
                    patchState(store, JSON.parse(state))
                }
                effect(() => {
                    localStorage.setItem(key, JSON.stringify(getState(store)))
                })
                }}
        }))
    );
}