import { LinkedList } from '../linked-lists/linked-list';

describe('linked list tests', () => {
  it('should find element in the list correctly', () => {
    const list = new LinkedList<string>();
    list.insert('found');
    expect(list.find('found').data).toEqual('found');
    list.insert('found_again');
    expect(list.find('found_again').data).toEqual('found_again');
    expect(list.find('not_found')).toBe(null);
  });

  it('should insert element in correct order', () => {
    const list = new LinkedList<string>();
    list.insert('one');
    list.insert('two');
    list.insert('three');
    expect([...list.print()]).toEqual(['three', 'two', 'one']);
  });

  it('should delete only first element', () => {
    const list = new LinkedList<string>();
    list.deleteFirst('four');
    expect([...list.print()]).toEqual([]);
    list.insert('one');
    list.deleteFirst('one');
    expect([...list.print()]).toEqual([]);
    list.insert('two');
    list.insert('three');
    list.deleteFirst('four');
    expect([...list.print()]).toEqual(['three', 'two']);
    list.insert('three');
    list.insert('three');
    list.deleteFirst('three');
    expect([...list.print()]).toEqual(['three', 'three', 'two']);
    list.deleteFirst('two');
    expect([...list.print()]).toEqual(['three', 'three']);
    list.deleteFirst('three');
    list.deleteFirst('three');
    expect([...list.print()]).toEqual([]);
  });
});
