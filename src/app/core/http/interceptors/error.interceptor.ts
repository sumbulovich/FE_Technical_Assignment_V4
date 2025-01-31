import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@app/shared/components/snackbar/snackbar.component';
import { SnackbarData } from '@app/shared/models/snackbar-data.model';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      const errorMessage =
        e.error?.message || `Something went wrong (${e.status})`;

      // Show snackbar with error message
      snackBar.openFromComponent(SnackbarComponent, {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        data: {
          type: 'error',
          title: e.statusText,
          message: errorMessage,
        } as SnackbarData,
      });

      return throwError(() => e);
    }),
  );
};
