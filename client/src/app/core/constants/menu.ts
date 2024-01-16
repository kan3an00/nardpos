import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Products',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/shopping-bag.svg',
          label: 'Products',
          route: '/products',
          children: [
            { label: 'All Products', route: '/dashboard/products' },
            { label: 'Create Product', route: '/dashboard/products/create' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/receipt-percent.svg',
          label: 'Transactions',
          route: '/transactions',
          children: [
            { label: 'All transactions', route: '/dashboard/transactions' },
            { label: 'Create Transaction', route: '/dashboard/transactions/create' },
          ],
        },
      ],
    }
  ];
}
