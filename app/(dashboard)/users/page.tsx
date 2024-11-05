import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { fetchUser, fetchUsers } from '@/lib/prisma';
import { columns } from './columns';
import { DataTable } from './data-table';

const UsersPage = async () => {
  const user = await fetchUser();
  if (!user || user.role !== 'admin') {
    return null;
  }
  const users = await fetchUsers(user);
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Users</CardTitle>
        <CardDescription className="text-gray-500">
          Manage user accounts and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={users} />
      </CardContent>
    </Card>
  );
};

export default UsersPage;
