import { Routes } from '@angular/router';
import { PicoPreviewComponent } from "./components/pico-preview/pico-preview.component";
import { ProductComponent } from "./components/product/product.component";
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'pico-preview', component: PicoPreviewComponent }
];
