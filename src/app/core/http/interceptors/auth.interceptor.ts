import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@env/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = environment.ApiKey;
  if (token) req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
  return next(req);
};
