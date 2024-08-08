import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app-routing.module';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-31e8a","appId":"1:580508054465:web:05075e958aa4dae8def540","storageBucket":"ring-of-fire-31e8a.appspot.com","apiKey":"AIzaSyAhYAaXyebB1ohwLIshmgYLBEkUhwPTfIU","authDomain":"ring-of-fire-31e8a.firebaseapp.com","messagingSenderId":"580508054465"})), provideFirestore(() => getFirestore())],
};
