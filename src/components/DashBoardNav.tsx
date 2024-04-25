'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { navItems } from './UserNav'
const DashBoardNav = () => {
    const pathname = usePathname();
    
    if (!Array.isArray(navItems) || navItems.length === 0) {
        return null; // or handle empty case gracefully
    }
    
    return (
        <nav className=' grid items-start gap-2'>
            {navItems.map((item, index) => (
                <Link key={index} href={item.href}>
                    <span className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:accent-foreground", 
                        pathname === item.href ? 'bg-accent' : 'bg-transparent'
                    )}>
                        {item.icon && <item.icon className='mr-2 h-4 w-4 text-primary'/>}
                        <span>{item.name}</span>
                    </span>
                </Link>
            ))}
        </nav>
    );
}

export default DashBoardNav;

