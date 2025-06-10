"use client";
import { useAdminFeatures } from '@/hooks/useAdminFeatures';

export default function ProductsLayout({ children }) {
    const { AdminButtons } = useAdminFeatures();

    return (
        <div className="flex flex-col gap-6">
            <AdminButtons />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
