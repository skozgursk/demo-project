import { createBrowserRouter, type LoaderFunctionArgs } from "react-router-dom";
import { AddressDetails, CardDetail, Checkout, Login, Orders, PaymentDetails, ProductDetail, Products, Register } from "./../pages"

import { AuthorizationLayout, ShoppingLayout, MainLayout } from "../components";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader: protectedLoader,
    Component: ShoppingLayout,
    children: [
      {
        id: 'home',
        path: '/',
        Component: Products
      },
      {
        id: 'products',
        path: '/products',
        Component: Products
      }
    ],
  },
  {
    id: "main",
    path: "/",
    loader: protectedLoader,
    Component: MainLayout,
    children: [
      {
        id: 'productDetail',
        path: '/products/:id',
        Component: ProductDetail
      }
    ],
  },
  {
    id: "authorization",
    path: "/",
    loader: publicLoader,
    Component: AuthorizationLayout,
    children: [

    ]

  }
]);

async function redirectControl(request: Request) {
  let params = new URLSearchParams();
  // const from = new URL(request.url).searchParams.get('from')
  // if (from) {
  //   params.set("from", from);
  // } else {
  //   const currentPage = new URL(request.url).pathname
  //   if (!Object.values(Public_Pages).includes(currentPage)) {
  //     params.set("from", new URL(request.url).pathname);
  //   }
  // }

  return params

}

async function publicLoader({ request }: LoaderFunctionArgs) {
  // const params: URLSearchParams = await redirectControl(request)
  // if (store?.getState()?.authorization?.userData) {
  //   return redirect((params && params.get('from') !== null) ? (params.get('from') as string) : `/`);
  // }
  return null;
}

async function protectedLoader({ request }: LoaderFunctionArgs) {
  // const params = await redirectControl(request)
  // if (!store?.getState()?.authorization?.userData) {
  //   return redirect(`signIn?${params.toString()}`);
  // }
  return null;
}