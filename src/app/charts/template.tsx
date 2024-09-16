import { PageContainer } from "@toolpad/core";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

export default async function Template({
    children,
}: {
    children: React.ReactNode;
}) {
    return <PageContainer>{children}</PageContainer>;
}
