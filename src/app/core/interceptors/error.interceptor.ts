import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Error desconocido';
      if (error.status === 0) message = 'Sin conexión al servidor';
      else if (error.status === 401) message = 'No autorizado';
      else if (error.status === 403) message = 'Acceso denegado';
      else if (error.status === 404) message = 'Recurso no encontrado';
      else if (error.status >= 500) message = 'Error interno del servidor';
      console.error(`[HTTP Error ${error.status}]`, message, error);
      return throwError(() => new Error(message));
    })
  );
};