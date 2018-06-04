export interface IMruCache<T extends { toString(): string }> {
  size: number;
  capacity: number;
  add(item: T): void;
  print(): IterableIterator<string>;
}

export interface ICacheItem<T extends { toString(): string}> {
  data: T;
  next: ICacheItem<T>;
  prev: ICacheItem<T>;
}

/**
 * MRU Cache Implementation
 */
export class MruCache<T> implements IMruCache<T> {
  private mSize: number;
  private mCapacity: number;
  private first: ICacheItem<T>;
  private last: ICacheItem<T>;

  constructor(capacity: number) {
    this.mCapacity = capacity;
    this.mSize = 0;
    this.first = null;
    this.last = null;
  }

  public get size(): number {
    return this.mSize;
  }

  public get capacity(): number {
    return this.mCapacity;
  }

  public *print(): IterableIterator<string> {
    let cur = this.first;

    while (cur !== null) {
      yield cur.data.toString();
      cur = cur.next;
    }
  }

  public add(item: T): void {
    const newNode: ICacheItem<T> = {
      data: item,
      next: this.first,
      prev: null,
    };

    if (this.first !== null) {
      this.first.prev = newNode;
    }

    this.first = newNode;

    if (this.last === null) {
      this.last = newNode;
    }

    if (this.mCapacity === this.mSize) {
      this.last = this.last.prev;
      this.last.next = null;
    } else {
      this.mSize += 1;
    }
  }
}
