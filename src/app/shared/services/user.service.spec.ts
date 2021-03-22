import { TestBed } from '@angular/core/testing';
import { UsersService } from './user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';



describe('DataService', () => {
  let userService: UsersService;
  let httpTestingController: HttpTestingController;
  let campaign;
  let mediaplan;
  let olivePostData;
  let oliveResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [

        UsersService,

      ],
    });
    userService = TestBed.get(UsersService);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });
  describe('All', () => {
    it('should get all users', () => {
      const users = [{id:1}, {id:2}];
      userService.all().subscribe(data => {
        expect(data.length).toBe(2);
      });
      const BASE_URL = "http://localhost:3000/Users";

      const clientsRequest: TestRequest = httpTestingController.expectOne(BASE_URL);
      expect(clientsRequest.request.method).toEqual('GET');
      clientsRequest.flush(users);
    });

  });
  describe('load', () => {
    it('should return the current user', () => {
      userService.load('9353').subscribe(data => {
       expect(data.id).toEqual('1');
      });
      const BASE_URL = "http://localhost:3000/Users/9353";
      const req = httpTestingController.expectOne(BASE_URL);
      expect(req.request.method).toEqual('GET');
      req.flush({
        id: '1',
        name: 'test',
      });
    });
  });
  describe('delete', () => {
    it('should delete the current user', () => {
      userService.delete('9353').subscribe(data => {
       expect(data).toEqual({id: '1', name: 'test'});
      });
      const BASE_URL = "http://localhost:3000/Users/9353";
      const req = httpTestingController.expectOne(BASE_URL);
      expect(req.request.method).toEqual('DELETE');
      req.flush({
        id: '1',
        name: 'test',
      });
    });
  });
  describe('create', () => {
    it('should add a user', () => {
      userService.create({name: 'z', salary: 1}).subscribe(data => {
       expect(data).toEqual({name: 'z', salary: 1, id: '1'});
      });
      const BASE_URL = "http://localhost:3000/Users";
      const req = httpTestingController.expectOne(BASE_URL);
      expect(req.request.method).toEqual('POST');
      req.flush({
        salary: 1,
        name: 'z',
        id: '1'
      });
    });
  });

  describe('update', () => {
    it('should update a user', () => {
      userService.update('1', null).subscribe(data => {
       expect(data).toEqual({name: 'z', salary: 1, id: '1'});
      });
      const BASE_URL = "http://localhost:3000/Users/1";
      const req = httpTestingController.expectOne(BASE_URL);
      expect(req.request.method).toEqual('PATCH');
      req.flush({
        salary: 1,
        name: 'z',
        id: '1'
      });
    });
  });
});
