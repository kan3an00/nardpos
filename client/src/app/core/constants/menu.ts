import { MenuItem } from '../models/menu.model';

export class Menu {
  public static getFilteredPages(): MenuItem[] {
    let user: any = null;
    const storedUser = localStorage.getItem('user');

    if (storedUser !== null) {
      user = JSON.parse(storedUser);
    } else {
      // Handle the case when 'user' is not available in localStorage
      console.warn("No user data found in localStorage");
    }

    // Check if the user exists and has a role
    if (user && user.role) {
      // Filter menu items based on user role
      return this.pages.map(group => {
        if (group.items) {
          group.items = group.items.filter(item => {
            if (item.children) {
              item.children = item.children.filter(child => {
                // Filter out 'Create Product' if user role is 'employee'
                return !(user.role === 'employee' && (child.label === 'Create Product' || child.label === 'Create Transaction') );
              });
            }
            // Filter out 'Create Product' if user role is 'employee'
            return !(user.role === 'employee' && (item.label === 'Create Product' || item.label === 'Create Transaction'));
          });
        }
        return group;
      });
    }

    // Default to returning the original menu if user or role is not available
    return this.pages;
  }

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
