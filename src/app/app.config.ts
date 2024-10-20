import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';

const jwtInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const jwtInterceptor = new JwtInterceptor();
  return jwtInterceptor.intercept(req, {
    handle: next
  });
};
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtInterceptorFn])
    )]
};
