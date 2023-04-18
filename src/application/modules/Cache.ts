type Key = number | string;

type TCache<T> = {
    [key: Key]: T
}

export default class Cache<T>{
    private cache: TCache<T> = {};
    constructor() {
    }

    public set(key: Key, value: T): void {
        this.cache[key] = value;
    }

    public get(key: Key): T {
        return this.cache[key];
    }

    public getAll(): TCache<T> {
        return this.cache;
    }

    public remove(key: Key): void {
        delete this.cache[key];
    }

    public delete(): void {
        this.cache = {};
    }

    public forAll(func: Function) {
        for (let value of Object.values(this.cache)) {
            func(value);
        }
    }
}