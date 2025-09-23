"use client"
import React, {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle
} from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { getUserAddresses } from "@/AddressActions/AllAddresses.action"
import { toast } from "sonner"
import { AddressDisplayType } from "@/types/address.type";
import { Button } from '@/components/ui/button';
import { deleteAddress } from "@/AddressActions/deleteAddresses.action";

type AddressListProps = {
    selectedAddress: string;
    setSelectedAddress: (id: string) => void;
};

export type AddressListHandle = {
    refresh: () => void;
};


const AddressList = forwardRef<AddressListHandle, AddressListProps>(
    ({ selectedAddress, setSelectedAddress }, ref) => {
        const [addresses, setAddresses] = useState<AddressDisplayType[]>([])
        const [loading, setLoading] = useState(true)
        const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
        // Fetch addresses from the server
        async function fetchAddresses() {
            setLoading(true)
            try {
                const res = await getUserAddresses()
                setAddresses(
                    res.data.filter(
                        (address: AddressDisplayType) =>
                            address.name && address.city && address.phone && address.details
                    )
                )
            } catch (err) {
                // console.error(err)
                toast.error("Failed to fetch addresses", { position: "top-center" })
            } finally {
                setLoading(false)
            }
        }

        useImperativeHandle(ref, () => ({
            refresh: fetchAddresses
        }))

        useEffect(() => {
            fetchAddresses()
        }, [])

        return (
            <div className="my-6">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="font-bold">Select Address:</h2>
                </div>

                {loading ? (
                    <p className="text-gray-500 italic">Loading addresses...</p>
                ) : addresses.length === 0 ? (
                    <p className="text-red-600">No address available, please add one.</p>
                ) : (
                    addresses.map((address) => (
                        
                        <div
                            key={address._id}
                            className="flex items-start justify-between gap-4 border p-3 rounded-2xl hover:shadow-lg hover:shadow-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 mb-2"
                        >
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="address"
                                    value={address._id}
                                    checked={selectedAddress === address._id}
                                    onChange={() => setSelectedAddress(address._id)}
                                />
                                <div>
                                    <p><b>{address.name}</b></p>
                                    <p>{address.city}, {address.details}</p>
                                    <p>{address.phone}</p>
                                </div>
                            </label>

                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => setDeleteTarget(address._id)}
                                className="rounded-full h-6 w-6 flex items-center bg-red-400 justify-center p-0 hover:bg-red-600"
                            >
                                ✕
                            </Button>

                            {/* Delete Confirmation Dialog */}
                            <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Delete Address</DialogTitle>
                                    </DialogHeader>
                                    <p>Are you sure you want to delete this address? This action cannot be undone.</p>
                                    <DialogFooter className="flex justify-end gap-2 pt-4">
                                        <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={async () => {
                                                if (!deleteTarget) return
                                                try {
                                                    const res = await deleteAddress(deleteTarget)
                                                    if (res.status === "success") {
                                                        toast.success("Address deleted", { position: "top-center" })
                                                        await fetchAddresses()
                                                    } else {
                                                        toast.error("Failed to delete address", { position: "top-center" })
                                                    }
                                                } catch (err: unknown) {
                                                    // const message = err instanceof Error ? err.message : String(err)
                                                    // toast.error(message || "Error deleting address", { position: "top-center" })
                                                    toast.error("Error deleting address", { position: "top-center" })
                                                }
                                                setDeleteTarget(null)
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                    ))
                )}
            </div>
        )
    }
)
AddressList.displayName = "AddressList";
export default AddressList