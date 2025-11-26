"use client";

import { useUserManage } from "@/hooks/admin/useUserManage";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader2, Trash2 } from "lucide-react";

export default function UserList() {
  const {
    users,
    loading,
    error,
    pagination,
    handleDelete,
    goToPage,
    setLimit,
    refresh,
  } = useUserManage();

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
      </div>
    );

  if (error)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p>{error}</p>
          <Button onClick={refresh}>Coba lagi</Button>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Daftar Pengguna (Pasien)</CardTitle>
        <div className="flex items-center gap-3">
          <Select
            onValueChange={(v) => setLimit(Number(v))}
            defaultValue={String(pagination.limit)}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 / hal</SelectItem>
              <SelectItem value="10">10 / hal</SelectItem>
              <SelectItem value="20">20 / hal</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refresh}>
            Refresh
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {users.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-6">
            Tidak ada pengguna ditemukan.
          </p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Dibuat Pada</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u, index) => {
                  const page = pagination?.currentPage ?? 1;
                  const limit = pagination?.limit ?? users.length;
                  const number = (page - 1) * limit + (index + 1);

                  return (
                    <TableRow key={u.id}>
                      <TableCell>{number}</TableCell>
                      <TableCell>{u.username}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.role}</TableCell>
                      <TableCell>
                        {new Date(u.createdAt).toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          className="cursor-pointer"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(u.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Hapus
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* PAGINATION SECTION */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className="cursor-pointer"
                      onClick={() => goToPage(pagination.currentPage - 1)}
                      disabled={pagination.currentPage <= 1}
                    />
                  </PaginationItem>

                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === pagination.currentPage;
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => goToPage(pageNumber)}
                          isActive={isActive}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      className="cursor-pointer"
                      onClick={() => goToPage(pagination.currentPage + 1)}
                      disabled={pagination.currentPage >= pagination.totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
