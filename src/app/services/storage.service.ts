import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private readonly STORAGE_KEY = 'watchlist';

    constructor() { }

    getList(): any[] {
        const list = localStorage.getItem(this.STORAGE_KEY);
        return list ? JSON.parse(list) : [];
    }

    addItem(item: any): void {
        const list = this.getList();
        if (!this.isItemInList(item.id)) {
            list.push(item);
            this.saveList(list);
        }
    }

    removeItem(id: number): void {
        let list = this.getList();
        list = list.filter(item => item.id !== id);
        this.saveList(list);
    }

    isItemInList(id: number): boolean {
        const list = this.getList();
        return list.some(item => item.id === id);
    }

    private saveList(list: any[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    }
}
