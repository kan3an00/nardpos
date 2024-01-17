import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";
import { AppRoutingModule } from './app-routing.module';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

export function tokenGetter() {
  return localStorage.getItem("token");
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
          },
      }),
    ),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    provideClientHydration()
  ]
};
