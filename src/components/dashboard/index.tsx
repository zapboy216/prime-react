import React from "react";
import { useApiUrl, useCustom } from "@refinedev/core";
import dayjs from "dayjs";

import { KpiCard } from "../../components/dashboard/kpiCard";

import { IChart } from "../../interfaces";

const query = {
  start: dayjs().subtract(7, "days").startOf("day"),
  end: dayjs().startOf("day"),
};

export const Dashboard: React.FC = () => {
  const API_URL = useApiUrl();

  const { data: dailyRevenue } = useCustom<IChart>({
    url: `${API_URL}/dailyRevenue`,
    method: "get",
    config: {
      query,
    },
  });

  const { data: dailyOrders } = useCustom<IChart>({
    url: `${API_URL}/dailyOrders`,
    method: "get",
    config: {
      query,
    },
  });

  const { data: newCustomers } = useCustom<IChart>({
    url: `${API_URL}/newCustomers`,
    method: "get",
    config: {
      query,
    },
  });

  return (
    <div className="grid">
      <div className="col-12 lg:col-6 xl:col-4">
        <KpiCard
          title="Weekly Revenue"
          color="blue-300"
          total={dailyRevenue?.data.total ?? 0}
          trend={dailyRevenue?.data.trend ?? 0}
          formatTotal={(value) => `$ ${value}`}
          icon="pi-dollar"
        />
      </div>
      <div className="col-12 lg:col-6 xl:col-4">
        <KpiCard
          title="Weekly Orders"
          color="orange-300"
          total={dailyOrders?.data.total ?? 0}
          trend={dailyOrders?.data.trend ?? 0}
          icon="pi-shopping-cart"
        />
      </div>
      <div className="col-12 lg:col-6 xl:col-4">
        <KpiCard
          title="New Customers"
          color="green-500"
          total={newCustomers?.data.total ?? 0}
          trend={newCustomers?.data.trend ?? 0}
          icon="pi-users"
        />
      </div>
    </div>
  );
};