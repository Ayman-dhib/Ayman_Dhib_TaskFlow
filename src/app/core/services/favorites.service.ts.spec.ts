import { TestBed } from '@angular/core/testing';
import { FavoritesServiceTs } from './favorites.service.ts';

describe('FavoritesServiceTs', () => {
  let service: FavoritesServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
