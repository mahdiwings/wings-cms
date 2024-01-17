"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfrim: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfrim,
  loading,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <Modal
        title="Are You Sure?"
        description="This action cannot be undone."
        isOpen={isOpen}
        onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex justify-end items-center w-full">
                <Button variant={"outline"} disabled={loading} onClick={onClose} >Cancel</Button>
                <Button variant={"destructive"} disabled={loading} onClick={onConfrim}>Continue</Button>
            </div>
        </Modal>
    )


};
