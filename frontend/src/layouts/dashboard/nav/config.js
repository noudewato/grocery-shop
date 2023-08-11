// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Customer',
    path: '/dashboard/user',
    icon: icon('ic_blog'),
  },
  {
    title: 'category',
    path: '/dashboard/category',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'order',
    path: '/dashboard/order',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
