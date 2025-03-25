import React from 'react'
import { LikeList, MenuBtn } from '../assets/Icons'
import Link from 'next/link'

const Header = () => {
    const list = [
        {
            id: 1,
            title: "Home",
            path: "/"
        },
        {
            id: 2,
            title: "Add Product",
            path: "/addProduct"
        },
        {
            id: 3,
            title: "Collections",
            path: "/collections"
        }
    ]
    return (
        <header className='px-[50px] flex items-center justify-between py-[10px]'>
            <div className="flex items-center gap-[34px]">
                <button className='inline-block cursor-pointer'><MenuBtn /></button>
                <ul className='flex items-center gap-[35px]'>
                    {list.map(item => (
                        <Link href={item.path} key={item.id} className='text-[20px] leading-[25px] font-medium'>{item.title}</Link>
                    ))}
                </ul>
            </div>
            <Link href={'/like'} className='rotate-[42deg]'><LikeList /></Link>
        </header>
    )
}

export default Header