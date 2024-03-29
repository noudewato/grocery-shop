import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import EditUserPage from './pages/EditUserPage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import OldProductsPage from './pages/OldProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import EditCategoryPage from './pages/EditCategoryPage';
import NewProductPage from './pages/NewProductPage';
import EditProductPage from './pages/EditProductPage';
import NewCategoryPage from './pages/NewCategoryPage';
import OrderPage from './pages/OrderPage';
import UserLoginPage from './pages/web-view/auth/UserLoginPage';
import RegisterLoginPage from './pages/web-view/auth/UserRegisterPage';
import ProductList from './pages/web-view/product/product-list.component'
import Home from './pages/web-view/Home';
import Cart from './pages/web-view/cart/cart.component';
import Checkout from './pages/web-view/checkout/checkout.component';
import FormValidation from './components/web/form-validation.component';
import Form from './pages/web-view/productService';
import OrderDetailsPage from './pages/OrderDetailsPage';
import UserProfile from './pages/web-view/user-profile';
import SimilarProduct from './pages/web-view/SimilarProduct';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'category', element: <CategoryPage /> },
        { path: 'new-category', element: <NewCategoryPage /> },
        { path: 'edit-category/:id', element: <EditCategoryPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'new-product', element: <NewProductPage /> },
        { path: 'edit-product/:id', element: <EditProductPage /> },
        { path: 'order', element: <OrderPage /> },
        { path: 'order-detail/:id', element: <OrderDetailsPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'edit-user/:id', element: <EditUserPage /> },
        { path: 'old-product', element: <OldProductsPage /> },
        { path: 'form', element: <Form /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'login-user',
      element: <UserLoginPage />,
    },
    {
      path: 'register-user',
      element: <RegisterLoginPage />,
    },
    {
      path: 'shop',
      element: <ProductList />,
    },
    {
      path: '/GroceryShop/cart',
      element: <Cart />,
    },
    {
      path: '/GroceryShop/checkout',
      element: <Checkout />,
    },
    {
      path: '/GroceryShop/form',
      element: <FormValidation />,
    },
    {
      path: '/GroceryShop/similar-product/:id',
      element: <SimilarProduct />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/GroceryShop/home',
      element: <Home />,
    },
    {
      path: '/GroceryShop/user-profile',
      element: <UserProfile />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
