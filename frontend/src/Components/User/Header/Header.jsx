import logo from './../../../assets/Images/logo.png'
import profile from './../../../assets/Images/profile.png'
import { MdArticle, MdPermContactCalendar } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { PiTelegramLogoFill } from "react-icons/pi";
import HeaderItems from './HeaderItems';
import { Link, NavLink } from 'react-router-dom';
import { MdManageAccounts } from "react-icons/md";
import { GiTripleGate } from "react-icons/gi";


function Header() {

    const menu = [
        { name: 'Home', icon: GoHomeFill, link: '/' },
        { name: 'Trips', icon: PiTelegramLogoFill, link:'/trip'},
        { name: 'Destination', icon: GiTripleGate, link:'/destination'},
        { name: 'About', icon: MdArticle },
        { name: 'Contact', icon: MdPermContactCalendar }
    ];

    return (
        <div className='flex p-5 items-center justify-between'>
            <div className="flex gap-10 ">
                <img src={logo} className='w-[150px] md:w-[200px] object-cover cursor-pointer mr-20' />
                <div className='hidden md:flex gap-8'>
                    {menu.map((item, index) => (
                        <Link key={index} to={item.link} className="text-black hover:text-gray-500">
                            <HeaderItems name={item.name} Icon={item.icon} />
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-12">
                <div className='md:hidden flex gap-8'>
                    {menu.map((item, index) => (
                        <HeaderItems key={index} to={item.link} name={item.name} Icon={item.icon} />
                    ))}
                </div>
                
                <NavLink to="/profile" className="active">
                    <MdManageAccounts style={{ fontSize: '30px' }} />
                </NavLink>
                <NavLink to="/login" className="active">
                    <img className='flex w-[30px] rounded-full cursor-pointer' src={profile} />
                </NavLink>
            </div>
        </div>
    );
}

export default Header;
