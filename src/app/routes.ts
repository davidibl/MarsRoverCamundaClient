import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MarsComponent } from './components/mars/mars.component';

export const routes: Routes = [
    { component: MarsComponent, path: '' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
