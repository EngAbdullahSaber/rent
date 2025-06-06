"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useThemeStore } from "@/store";

import { useTranslate } from "@/config/useTranslation";

import "./custemStyleReports.css";

import DatePickerWithRange from "@/components/date-picker-with-range";
import EcommerceStats from "./components/ecommerce-stats";
import ReportsSnapshot from "./components/reports-snapshot";
import TopBrowserChart from "./components/top-browser-chart";
import ActiveTask from "./components/active-task";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import img1 from "@/public/images/avatar/avatar-7.jpg";
interface ReportItem {
  id: number;
  name: string;
  count: string;
  rate: string;
  href: string;
  icon: React.ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "destructive"
    | "default"
    | "dark";
}

const page = () => {
  const { t } = useTranslate();

  const { theme: config, setTheme: setConfig } = useThemeStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="text-2xl font-medium text-default-800">
          {t("Sales statistics")}
        </div>
        <DatePickerWithRange />
      </div>
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <EcommerceStats />
          </div>
        </CardContent>
      </Card>
      <div className=" ">
        <ReportsSnapshot />
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5">
          <Card className="py-2.5">
            <CardHeader className="flex-row items-center justify-between gap-4 border-none">
              <CardTitle>{t("Best selling services")}</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-8">
              <TopBrowserChart />
              <div className="flex items-center px-4 gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={img1.src} alt="" />
                  <AvatarFallback>{t("")}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-default-600">
                    343434{" "}
                    <span className="text-xs font-normal text-default-400">
                      {t("request")}
                    </span>
                  </span>
                  <span className="text-sm font-semibold text-default-700">
                    {t("Service Provider Name")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <Card>
            <CardHeader className="border-none pt-6">
              <CardTitle>{t("Best selling services")}</CardTitle>
            </CardHeader>
            <CardContent className="px-3">
              <ActiveTask />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
