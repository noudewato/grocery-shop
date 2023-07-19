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

  {
    title: 'old-product',
    path: '/dashboard/old-product',
    icon: icon('ic_cart'),
  },

  {
    title: 'report',
    path: '/report',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
