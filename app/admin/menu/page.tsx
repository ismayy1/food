"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { menuItems as initialItems, type MenuItem, categories } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formCategory, setFormCategory] = useState<MenuItem["category"]>("wraps");
  const [formPopular, setFormPopular] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  function openAddDialog() {
    setEditingItem(null);
    setFormName("");
    setFormDescription("");
    setFormPrice("");
    setFormCategory("wraps");
    setFormPopular(false);
    setDialogOpen(true);
  }

  function openEditDialog(item: MenuItem) {
    setEditingItem(item);
    setFormName(item.name);
    setFormDescription(item.description);
    setFormPrice(String(item.price));
    setFormCategory(item.category);
    setFormPopular(item.popular ?? false);
    setDialogOpen(true);
  }

  function handleSave() {
    if (!formName || !formPrice) return;

    if (editingItem) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === editingItem.id
            ? {
                ...i,
                name: formName,
                description: formDescription,
                price: Number(formPrice),
                category: formCategory,
                popular: formPopular,
              }
            : i
        )
      );
    } else {
      const newItem: MenuItem = {
        id: `item-${Date.now()}`,
        name: formName,
        description: formDescription,
        price: Number(formPrice),
        category: formCategory,
        image: "/images/falafel-wrap.jpg",
        popular: formPopular,
      };
      setItems((prev) => [...prev, newItem]);
    }
    setDialogOpen(false);
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Menu Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add, edit, and manage your menu items
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-xl" onClick={openAddDialog}>
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Item name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Item description"
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (lei)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formCategory}
                    onValueChange={(v) =>
                      setFormCategory(v as MenuItem["category"])
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={formPopular}
                  onChange={(e) => setFormPopular(e.target.checked)}
                  className="h-4 w-4 rounded border-input text-primary accent-primary"
                />
                <Label htmlFor="popular" className="text-sm">
                  Mark as popular
                </Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} className="rounded-xl">
                  {editingItem ? "Save Changes" : "Add Item"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search menu items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterCategory("all")}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-all",
              filterCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={cn(
                "hidden rounded-lg px-3 py-2 text-sm font-medium transition-all sm:block",
                filterCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Item
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground md:table-cell">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Price
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">
                          {item.name}
                        </p>
                        <p className="line-clamp-1 text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span className="rounded-lg bg-secondary px-2 py-1 text-xs capitalize text-secondary-foreground">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-card-foreground">
                    {item.price} lei
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    {item.popular ? (
                      <Badge variant="default" className="rounded-full text-xs">
                        Popular
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Regular
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(item)}
                        className="h-8 w-8"
                        aria-label={`Edit ${item.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredItems.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No items found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
