import { Breadcrumbs } from "@/Components/Nav/Breadcrumps";
import { Box } from "@mui/material";
import Link from "next/link";

export default function Page({
    params: { all },
}: {
    params: {
        all: string[];
    };
}) {
    console.log({ all });

    // Note: you could fetch breadcrumb data based on params here
    // e.g. title, slug, children/siblings (for dropdowns)
    const items = Array.isArray(all)
        ? [
              {
                  text: "Home",
                  href: "/avangard",
              },
              ...all.map((param) => ({
                  text: param,
                  href: `/avangard/${param}`,
              })),
          ]
        : [
              {
                  text: all,
                  href: `/avangard/${all}`,
              },
          ];
    return (
        <Box>
            <Breadcrumbs items={items} />
        </Box>
    );
}
