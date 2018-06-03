export interface IListNode<T extends { toString(): string }> {
  data: T;
  next: IListNode<T>;
}

export interface ILinkedList<T> {
  find(data: T): IListNode<T> | null;
  deleteFirst(data: T): void;
  insert(data: T): void;
  print(): IterableIterator<string>;
}

/**
 * Linked List Implementation
 */
export class LinkedList<T> implements ILinkedList<T> {
  private head: IListNode<T>;

  constructor() {
    this.head = null;
  }

  public find(data: T): IListNode<T> | null {
    let curr = this.head;

    while (curr !== null) {
      if (curr.data === data) {
        return curr;
      }
      curr = curr.next;
    }

    return null;
  }

  public insert(data: T): void {
    const newNode: IListNode<T> = {
      data: data,
      next: this.head,
    };

    this.head = newNode;
  }

  public deleteFirst(data: T) {
    let curr: IListNode<T> = this.head;

    if (curr !== null) {
      if (curr.data === data) {
        this.head = this.head.next;
      }

      while (curr !== null && curr.next !== null) {
        if (curr.next.data === data) {
          curr.next = curr.next.next;
        }
        curr = curr.next;
      }
    }
  }

  public *print(): IterableIterator<string> {
    let curr = this.head;

    while (curr !== null) {
      yield curr.data.toString();
      curr = curr.next;
    }
  }
}
