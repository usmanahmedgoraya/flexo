import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Employee',
    url: '/dashboard/employee',
    icon: 'user',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Product',
    url: '/dashboard/product',
    icon: 'product',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: 'settings',
    isActive: false,
    items: [
      {
        title: 'Users',
        url: '/settings/user-registration',
        icon: 'userPen'
      },
      {
        title: 'User Management',
        url: '/settings/user-management',
        icon: 'userPen'
      },
      {
        title: 'Financial Parameters',
        url: '/settings/financial-parameters',
        icon: 'userPen'
      },
      {
        title: 'Numbering',
        url: '/settings/numbering',
        icon: 'userPen'
      },
       
    ]
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen'
      },
      {
        title: 'Login',
        url: '/',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    isActive: false,
    items: [] // No child items
  }
];

export const settingNavItems: NavItem[] = [
  {
    title: 'Users',
    url: '/settings/user-registration',
    icon: 'dashboard',
    isActive: false,
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Financial Parameters',
    url: '/settings/financial-parameters',
    icon: 'dashboard',
    isActive: false,
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'User Management',
    url: '/settings/user-management',
    icon: 'dashboard',
    isActive: false,
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Numbering',
    url: '/settings/numbering',
    icon: 'userPen',
    isActive: false,
  },
  {
    title: 'Employee',
    url: '/dashboard/employee',
    icon: 'user',
    isActive: false,
    items: [] // No child items
  },
   
       
   
   
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    isActive: false,
    items: [] // No child items
  }
];
