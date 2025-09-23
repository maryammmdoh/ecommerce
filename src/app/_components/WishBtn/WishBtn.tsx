"use client";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import AddToWish from "@/WishActions/addToWish.action";
import RemoveItemFromWish from "@/WishActions/removeWishItem.action";
import { WishContext } from "@/context/WishContext";

export default function WishBtn({ id }: { id: string }) {
  const ctx = useContext(WishContext);
  if (!ctx) throw new Error("WishContext not found");
  const { numberOfWishItems, setnumberOfWishItems, isInWishlist, add, remove } =
    ctx;

  const [busy, setBusy] = useState(false);
  const active = isInWishlist(id); // drives red state

  async function onClick() {
    if (busy) return;
    setBusy(true);

    if (!active) {
      // add
      await add(id);
      try {
        const res = await AddToWish(id);
        if (res?.status === "success") {
          toast.success("Product added to wishlist successfully 🥳", {
            position: "top-center",
            duration: 3000,
          });
          if (typeof res.count === "number") setnumberOfWishItems(res.count);
        } else {
          await remove(id);
          toast.error(res?.message ?? "Failed to add to wishlist", {
            position: "top-center",
            duration: 3000,
          });
        }
      } catch (error) {
        await remove(id);
        toast.error( error instanceof Error ? error.message : "Failed to add to wishlist", {
          position: "top-center",
          duration: 3000,
        });
      } finally {
        setBusy(false);
      }
    } else {
      await remove(id);
      try {
        const res = await RemoveItemFromWish(id);
        if (res?.status === "success") {
          toast.success("Removed from wishlist", {
            position: "top-center",
            duration: 3000,
          });
          if (typeof res.count === "number") setnumberOfWishItems(res.count);
        } else {
          await add(id);
          toast.error(res?.message ?? "Failed to remove from wishlist", {
            position: "top-center",
            duration: 3000,
          });
        }
      } catch (error) {
        await add(id);
        toast.error(error instanceof Error ? error.message : "Failed to remove from wishlist", {
          position: "top-center",
          duration: 3000,
        });
      } finally {
        setBusy(false);
      }
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={busy}
      aria-pressed={active}
      className="inline-flex items-center justify-center"
      title={active ? "Remove from wishlist" : "Add to wishlist"}
    >
      <i
        className={
          "fas fa-heart transition " +
          (active ? "text-red-600" : "text-gray-500 hover:text-red-500") +
          (busy ? " opacity-60 cursor-not-allowed" : "")
        }
      />
    </button>
  );
}
