import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseRequestOptions, Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {mockBackendFactory} from './mock-backend-factory';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    MockBackend,
    BaseRequestOptions,
    {
      provide: Http,
      deps: [MockBackend, BaseRequestOptions],
      useFactory: mockBackendFactory
    }
  ]
})

export class MockBackendModule {
}
