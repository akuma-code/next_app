import prisma from "@/client/client";
import { Box } from "@mui/material";
interface PageParams {
    params: { category: string; id: string };
    searchParams: { page: string; rpp: string };
}

const validCategories = ["player", "event"] as const;
export async function generateStaticParams() {
    const cats = validCategories.map((c) => ({ category: c }));

    return cats;
}
async function AvangardCategoryPage({ params, searchParams }: PageParams) {
    return <Box>{params.category}</Box>;
}

export default AvangardCategoryPage;
