'use client'
import * as React from 'react';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({});

interface NextLinkComposedProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as' | 'passHref' | 'onMouseEnter' | 'onClick' | 'onTouchStart'> {
    to: NextLinkProps['href'];
    linkAs?: NextLinkProps['as'];
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
    function NextLinkComposed(props, ref) {
        const {
            to,
            linkAs,
            replace,
            scroll,
            shallow,
            prefetch,
            legacyBehavior = true,
            locale,
            ...other
        } = props;

        return (
            <NextLink
                href={ to }
                prefetch={ prefetch }
                as={ linkAs }
                replace={ replace }
                scroll={ scroll }
                shallow={ shallow }
                passHref
                locale={ locale }
                legacyBehavior={ legacyBehavior }
            >
                <Anchor ref={ ref } { ...other } />
            </NextLink>
        );
    },
);

export type LinkMuiProps = {
    activeClassName?: string;
    as?: NextLinkProps['as'];
    href: NextLinkProps['href'];
    linkAs?: NextLinkProps['as']; // Useful when the as prop is shallow by styled().
    noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
    Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/pages/api-reference/components/link
const LinkMui = React.forwardRef<HTMLAnchorElement, LinkMuiProps>(function Link(props, ref) {
    const {
        activeClassName = 'active',
        as,
        className: classNameProps,
        href,
        legacyBehavior,
        linkAs: linkAsProp,
        locale,
        noLinkStyle,
        prefetch,
        replace,
        role, // Link don't have roles.
        scroll,
        shallow,
        ...other
    } = props;

    const router = useRouter();
    const path = usePathname()
    const pathname = typeof href === 'string' ? href : href.pathname;
    const className = clsx(classNameProps, {
        [activeClassName]: path === pathname && activeClassName,
    });

    const linkAs = linkAsProp || as;
    const nextjsProps = {
        to: href,
        linkAs,
        replace,
        scroll,
        shallow,
        prefetch,
        legacyBehavior,
        locale,
    };

    if (noLinkStyle) {
        return <NextLinkComposed className={ className } ref={ ref } { ...nextjsProps } { ...other } />;
    }

    return (
        <MuiLink
            component={ NextLinkComposed }
            className={ className }
            ref={ ref }
            { ...nextjsProps }
            { ...other }
        />
    );
});

export default LinkMui;