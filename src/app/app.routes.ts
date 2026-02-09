import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { HomeLayout } from './layout/home-layout/home-layout';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';
import { Auth } from './pages/auth/auth';
import { importProvidersFrom } from '@angular/core';
import { DropdownModule } from '@coreui/angular';

importProvidersFrom(DropdownModule)



export const routes: Routes = [
    {
        path:'dashboard',
        component:Dashboard,
        title:'Study+ Dashboard'
    },
    {
        path:'auth/:method',
        component:Auth,
        title:'Welcome to Study+'
    },
    {
        path:'auth',
        redirectTo:'auth/login',
        
        
    }
    ,
    {
        path:'',
        component:HomeLayout,
        children:[
            {
                path:'',
                component:Home
            },
            {
                path:'about',
                component:About,
                title:'study+ About'
            }
        ]
    },
    {
        path:'**',
        component:NotFound
    }
];
