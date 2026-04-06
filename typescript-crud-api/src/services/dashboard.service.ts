import { db } from "../_helpers/db";
import { RequestStatus } from "../models/request.model";

export interface DashboardStats {
  totalUsers: number;
  totalEmployees: number;
  totalDepartments: number;
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
}

export const dashboardService = {
  getStats,
};

async function getStats(): Promise<DashboardStats> {
  const [
    totalUsers,
    totalEmployees,
    totalDepartments,
    totalRequests,
    pendingRequests,
    approvedRequests,
  ] = await Promise.all([
    db.User.count(),
    db.Employee.count(),
    db.Departments.count(),
    db.Request.count(),
    db.Request.count({ where: { status: RequestStatus.Pending } }),
    db.Request.count({ where: { status: RequestStatus.Approved } }),
  ]);

  return {
    totalUsers,
    totalEmployees,
    totalDepartments,
    totalRequests,
    pendingRequests,
    approvedRequests,
  };
}
