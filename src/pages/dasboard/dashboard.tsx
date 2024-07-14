import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Layout from "@/components/main-layout";
import { fetchBorrowBooks, deleteBook } from "@/utils/apis/borrow";
import { getBorrowAdminType } from "@/utils/types/borrow";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [borrowedBooks, setBorrowedBooks] = useState<getBorrowAdminType[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: string; order: "asc" | "desc" }>({ key: "title", order: "asc" });
  const [filter, setFilter] = useState<{ available: "all" | "true" | "false" }>({ available: "all" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    setLoading(true);
    try {
      const books = await fetchBorrowBooks();
      setBorrowedBooks(books);
    } catch (error) {
      console.error("Error fetching borrowed books:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handleSort = (key: string) => {
    setSort((prevSort) => ({
      key,
      order: prevSort.key === key && prevSort.order === "asc" ? "desc" : "asc",
    }));
  };

  const handleFilter = (key: string, value: string) => {
    setFilter({ ...filter, [key]: value as "all" | "true" | "false" });
  };

  const handleEdit = (id: number) => {
    console.log(`Edit book with ID ${id}`);
    navigate(`/editBorrow/${id}`); // Navigate to edit borrow page with book ID
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      setBorrowedBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      console.log(`Deleted book with ID ${id}`);
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };

  const filteredBooks = useMemo(() => {
    return borrowedBooks
      .filter((book) => {
        const searchValue = search.toLowerCase();
        return book.title.toLowerCase().includes(searchValue);
      })
      .filter((book) => {
        if (filter.available === "all") return true;
        return book.available === (filter.available === "true");
      })
      .sort((a, b) => {
        if (sort.order === "asc") {
          return a[sort.key] > b[sort.key] ? 1 : -1;
        } else {
          return a[sort.key] < b[sort.key] ? -1 : 1;
        }
      });
  }, [borrowedBooks, search, sort, filter]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Borrowed Books</h1>
          <Button
            onClick={() => navigate("/managebook")}
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            Manage All Books
          </Button>
          {/* Tombol Manage All Books */}
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-md">
            <Input type="text" placeholder="Search borrowed books..." value={search} onChange={handleSearch} className="w-full pl-10" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by availability</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={filter.available === "all"} onCheckedChange={() => handleFilter("available", "all")}>
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={filter.available === "true"} onCheckedChange={() => handleFilter("available", "true")}>
                Available
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={filter.available === "false"} onCheckedChange={() => handleFilter("available", "false")}>
                Unavailable
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center">
              <span>Loading...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                    Title
                    {sort.key === "title" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("borrow_date")}>
                    Borrow Date
                    {sort.key === "borrow_date" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
                  </TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{new Date(book.borrow_date).toLocaleDateString()}</TableCell>
                    <TableCell>{book.full_name}</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(book.id)}>
                        Edit
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(book.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
