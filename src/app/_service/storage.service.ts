import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  public get<T>(storage_name: string) {
    // let value = <any>this.storage.getItem(storage_name);
    let value = <any>localStorage.getItem(storage_name);
    if (!value) return null;
    // return this.crytpSerive.get(Constants.KEYS.TOKEN, value) as T;
    return value as T;
  }

  public set(storage_name: string, value: any) {
    return localStorage.setItem(storage_name, value);
  }

  public clear(storage_name) {
    return localStorage.removeItem(storage_name);
  }
  public clear_all() {
    return localStorage.clear();
  }
}
