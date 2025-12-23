import { Subscription } from 'rxjs';
import { RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-items',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.css',
})
export class MenuItemsComponent {
  private subscription: Subscription | null = null;
  public products: any[] = [];

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const category = params['category'] || '';
      this.getMenuItems(`?category=${category}`);
    });
  }
  getMenuItems(queries: string = '') {
    this.subscription = this.menuService.getMenu(queries).subscribe((data) => {
      this.products = data;
    });
  }
}
