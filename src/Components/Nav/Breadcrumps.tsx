import { mdiArrowRightBoldHexagonOutline } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { Fragment } from "react";

export function Breadcrumbs({
    items,
}: {
    items: { text: string; href: string }[];
}) {
    return (
        <div className="flex gap-1.5 text-sm">
            {items.map((item, i) => {
                return (
                    <Fragment key={item.href}>
                        {i === 0 ? null : (
                            <Icon
                                path={mdiArrowRightBoldHexagonOutline}
                                size={1}
                            />
                        )}

                        <Link key={item.href} href={item.href}>
                            {item.text}
                        </Link>
                    </Fragment>
                );
            })}
        </div>
    );
}
