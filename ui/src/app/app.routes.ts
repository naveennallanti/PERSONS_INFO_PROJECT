import { Routes } from '@angular/router';
import { AddpersonComponent } from './components/addperson/addperson.component';
import { PersonsListComponent } from './components/personslist/personslist.component';

export const appRoutes: Routes  = [
    {path: '', redirectTo: 'persons', pathMatch:'full'},
    {path: 'persons', component: PersonsListComponent},
    { path: 'person', component: AddpersonComponent}
]