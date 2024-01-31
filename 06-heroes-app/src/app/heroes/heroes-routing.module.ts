import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

// localhost:4200/heroes/
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-hero', component: NewPageComponent, pathMatch: 'full' },
      { path: 'search', component: SearchPageComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: NewPageComponent, pathMatch: 'full' },
      { path: 'list', component: ListPageComponent, pathMatch: 'full' },
      { path: 'hero/:id', component: HeroPageComponent }, // Always at the end because it's a wildcard that matches everything
      { path: '**', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
