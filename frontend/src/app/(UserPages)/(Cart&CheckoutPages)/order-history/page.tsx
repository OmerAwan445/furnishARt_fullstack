"use client";

import TitleHeadings from "@/components/common/headings/TitleHeadings";
import { useAppDispatch } from "@/hooks/reduxHooks";
import OrderSvs from "@/services/Order";
import { SnackBarActions } from "@/store/Slices/SnackBarSlice";
import { Order } from "@/types/Types";
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import React, { useEffect, useState } from "react";

const OrdersHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { addMessage } = SnackBarActions;

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await OrderSvs.getUserOrders();
      if (data) setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    const { error, message } = await OrderSvs.updateOrderStatus(
      orderId,
      newStatus
    );

    if (!error) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, order_status: newStatus } : order
        )
      );
    }
    dispatch(addMessage({ message, type: error ? "error" : "success" }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-4">
      <TitleHeadings>
        Orders History
      </TitleHeadings>
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Customer ID</TableCell>
              <TableCell>Order Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-100">
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <span>
                    {order.order_status}
                  </span>
                </TableCell>
                <TableCell>${order.total_amount}</TableCell>
                <TableCell>{order.customer_id}</TableCell>
                <TableCell>
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="mb-2">
                      <img
                        src={item.furniture_item.image_urls[0]}
                        alt={item.furniture_item.name}
                        className="w-16 h-16 object-cover inline-block mr-2"
                      />
                      <span>
                        {item.furniture_item.name} x {item.quantity}
                      </span>
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrdersHistoryPage;
