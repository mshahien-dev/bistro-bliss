import { Component } from '@angular/core';
import { MenuItemsComponent } from '../items-children/menu-items/menu-items.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [MenuItemsComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent {}
