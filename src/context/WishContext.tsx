"use client";
import { createContext, useEffect, useMemo, useRef, useState, ReactNode } from "react";
import getlogedUserWish from "@/WishActions/getUserWish.action";
import { DataType } from '@/types/wishlist.type';


// ---- Context type
interface WishContextType {
  numberOfWishItems: number;
  setnumberOfWishItems: React.Dispatch<React.SetStateAction<number>>;
  wishIds: Set<string>;
  isInWishlist: (id: string) => boolean;
  add: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  toggle: (id: string) => Promise<void>;
}

// ---- Default context
export const WishContext = createContext<WishContextType>({
  numberOfWishItems: 0,
  setnumberOfWishItems: () => {},
  wishIds: new Set<string>(),
  isInWishlist: () => false,
  add: async () => {},
  remove: async () => {},
  toggle: async () => {},
});

interface WishContextProviderProps {
  children: ReactNode;
}

export default function WishContextProvider({ children }: WishContextProviderProps) {
  const [numberOfWishItems, setnumberOfWishItems] = useState<number>(0);
  const [wishIds, setWishIds] = useState<Set<string>>(new Set());
  const pending = useRef<Set<string>>(new Set()); // prevent double clicks

  async function getUserWish() {
    try {
      const res = await getlogedUserWish();
      // expected: { status: "success", count: number, data: [{id, ...}] }
      if (res?.status === "success") {
        const ids = new Set<string>((res.data ?? []).map((p: DataType) => p.id || p._id));
        setWishIds(ids);
        setnumberOfWishItems(res.count ?? ids.size);
      }
    } catch {
      // not logged or error; keep defaults
    }
  }

  useEffect(() => {
    getUserWish();
  }, []);

  // derived count safety net
  useEffect(() => {
    // if someone else updates ids, keep count aligned
    setnumberOfWishItems((prev) => (prev !== wishIds.size ? wishIds.size : prev));
  }, [wishIds]);

  const isInWishlist = (id: string) => wishIds.has(id);

  // You already have actions (add/remove) in /WishActions; we’ll call those from the button.
  // Here we only maintain local state helpers for optimistic UI if you want to call them from the button.
  const add = async (id: string) => {
    if (pending.current.has(id) || wishIds.has(id)) return;
    pending.current.add(id);
    setWishIds((prev) => new Set(prev).add(id));
    setnumberOfWishItems((n) => n + 1);
    pending.current.delete(id);
  };

  const remove = async (id: string) => {
    if (pending.current.has(id) || !wishIds.has(id)) return;
    pending.current.add(id);
    setWishIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setnumberOfWishItems((n) => Math.max(0, n - 1));
    pending.current.delete(id);
  };

  const toggle = async (id: string) => {
    if (isInWishlist(id)) return remove(id);
    return add(id);
  };

  const value = useMemo(
    () => ({
      numberOfWishItems,
      setnumberOfWishItems,
      wishIds,
      isInWishlist,
      add,
      remove,
      toggle,
    }),
    [numberOfWishItems, wishIds]
  );

  return <WishContext.Provider value={value}>{children}</WishContext.Provider>;
}