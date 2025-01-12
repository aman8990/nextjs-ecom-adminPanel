'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HiShoppingBag,
  HiCheckCircle,
  HiServer,
  HiAnnotation,
} from 'react-icons/hi';
import {
  HiMiniRectangleStack,
  HiTruck,
  HiUserGroup,
  HiUser,
  HiDocumentMagnifyingGlass,
  HiMiniDocumentPlus,
  HiMiniDocumentText,
  HiMiniDocumentMinus,
  HiExclamationCircle,
} from 'react-icons/hi2';
import { AiFillProduct } from 'react-icons/ai';

function Sidebar() {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  const spanClass = 'flex mt-1.5 items-center text-xl md:text-lg lg:text-xl';

  return (
    <nav>
      <ul className="mx-3 space-y-8 mt-5 mb-24 md:mb-10">
        <li>
          <Link
            href="/admin/dashboard"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/admin/dashboard')
                ? ' rounded-md bg-accent-600 text-white'
                : ''
            }`}
          >
            <HiServer size={35} />
            <span className={`${spanClass}`}>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/newOrders"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/admin/newOrders')
                ? ' rounded-md bg-accent-600 text-white'
                : ''
            }`}
          >
            <HiMiniRectangleStack size={30} />
            <span className={`${spanClass}`}>New Orders</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/acceptedOrders"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/admin/acceptedOrders')
                ? ' rounded-md bg-accent-600 text-white'
                : ''
            }`}
          >
            <HiCheckCircle size={30} />
            <span className={`${spanClass}`}>Accepted Orders</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/inTransitOrders"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/admin/inTransitOrders')
                ? ' rounded-md bg-accent-600 text-white'
                : ''
            }`}
          >
            <HiTruck size={30} />
            <span className={`${spanClass}`}>InTransit Orders</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/cancelledOrders"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/admin/cancelledOrders')
                ? ' rounded-md bg-accent-600 text-white'
                : ''
            }`}
          >
            <HiExclamationCircle size={30} />
            <span className={`${spanClass}`}>Cancelled Orders</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/allOrders"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/admin/allOrders')
                ? ' rounded-md bg-accent-600 text-white md:text-lg lg:text-xl'
                : ''
            }`}
          >
            <HiShoppingBag size={30} />
            <span className={`${spanClass}`}>All Orders</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/orderDetails"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/admin/orderDetails')
                ? ' rounded-md bg-accent-600 text-white'
                : ''
            }`}
          >
            <HiDocumentMagnifyingGlass size={30} />
            <span className={`${spanClass}`}>Order Details</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/allProducts"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/admin/allProducts')
                ? ' rounded-md bg-accent-600 text-white'
                : ''
            }`}
          >
            <AiFillProduct size={30} />
            <span className={`${spanClass}`}>All Products</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/createNewProduct"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/admin/createNewProduct')
                ? ' rounded-md bg-accent-600 text-white'
                : ''
            }`}
          >
            <HiMiniDocumentPlus size={30} />
            <span className={`${spanClass}`}>Create New Product</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/updateProduct"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/admin/updateProduct')
                ? ' rounded-md bg-accent-600 text-white'
                : ''
            }`}
          >
            <HiMiniDocumentText size={30} />
            <span className={`${spanClass}`}>Update Product</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/deleteProduct"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/admin/deleteProduct')
                ? ' rounded-md bg-accent-600 text-white'
                : ''
            }`}
          >
            <HiMiniDocumentMinus size={30} />
            <span className={`${spanClass}`}>Delete Product</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/userDetails"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/admin/userDetails')
                ? ' rounded-md bg-accent-600 text-white'
                : ''
            }`}
          >
            <HiUser size={30} />
            <span className={`${spanClass}`}>User Details</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/userQueries"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/admin/userQueries')
                ? ' rounded-md bg-accent-600 text-white'
                : ''
            }`}
          >
            <HiAnnotation size={30} />
            <span className={`${spanClass}`}>User Queries</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
