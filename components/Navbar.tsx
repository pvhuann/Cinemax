"use client";
import { Search } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
    const router = useRouter()
    const [search, setSearch] = useState("");
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setIsScrolled(true);
        } else setIsScrolled(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter' && search.trim().length > 0) {
            router.push(`/search/${search}`)
        }
    }
    return (
        <div className={`navbar ${isScrolled && "bg-black-1"}`}>
            <Link href="/">
                <img src="/assets/logo.png" alt="logo" className="logo" />
            </Link>

            <div className="nav-links">
                <Link href="/" className="nav-link">
                    Home
                </Link>
                <Link href="/my-list" className="nav-link">
                    My List
                </Link>
            </div>

            <div className="nav-right">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search movie..."
                        className="input-search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button disabled={search === ""}>
                        <Search className="icon" onClick={() => router.push(`/search/${search}`)} />
                    </button>
                </div>

                <img
                    src="/assets/profile_icon.jpg"
                    alt="profile"
                    className="profile rounded-md"
                    onClick={() => setDropdownMenu(!dropdownMenu)}
                />
                {dropdownMenu && (
                    <div className="dropdown-menu">
                        <Link href="/" className="">
                            Home
                        </Link>
                        <Link href="/my-list" className="">
                            My List
                        </Link>
                        <a href="log-out">Log Out</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
