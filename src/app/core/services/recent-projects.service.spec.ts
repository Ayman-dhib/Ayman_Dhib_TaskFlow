import { TestBed } from '@angular/core/testing';
import { RecentProjectsService } from './recent-projects.service';

describe('RecentProjectsService', () => {
  let service: RecentProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
