import { MruCache } from '../mru-cache/mru-cache';

describe('MRU Cache tests', () => {
  it('should set size and capacity correctly', () => {
    const cache = new MruCache(50);
    expect(cache.size).toEqual(0);
    expect(cache.capacity).toEqual(50);
  });

  it('should add and evict element correctly', () => {
    const cache = new MruCache<number>(3);
    cache.add(1);
    expect(cache.size).toEqual(1);
    expect([...cache.print()]).toEqual(['1']);
    cache.add(2);
    cache.add(3);
    cache.add(4);
    expect(cache.size).toEqual(cache.capacity);
    expect([...cache.print()]).toEqual(['4', '3', '2']);
    cache.add(3);
    cache.add(2);
    cache.add(1);
    expect([...cache.print()]).toEqual(['1', '2', '3']);
  });
});
