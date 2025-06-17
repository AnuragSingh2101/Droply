"use client";

import { useClerk, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { CloudUpload, ChevronDown, User, Menu, X } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { useState, useEffect, useRef } from "react";

interface SerializedUser {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  username?: string | null;
  emailAddress?: string | null;
}

interface NavbarProps {
  user?: SerializedUser | null;
}

export default function Navbar({ user }: NavbarProps) {
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Check if we're on the dashboard page or subpage
  const isOnDashboard = pathname === "/dashboard" || pathname?.startsWith("/dashboard/");

  // Handle scroll effect - add shadow to navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu if resizing to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu if clicking outside the drawer and not the menu button
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        const target = event.target as HTMLElement;
        if (!target.closest('[data-menu-button="true"]')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleSignOut = () => {
    signOut(() => {
      router.push("/");
    });
  };

  // Process user data with defaults if not provided
  const userDetails = {
    fullName: user
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : "",
    initials: user
      ? `${user.firstName || ""} ${user.lastName || ""}`
          .trim()
          .split(" ")
          .map((name) => name?.[0] || "")
          .join("")
          .toUpperCase() || "U"
      : "U",
    displayName: user
      ? user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName || user.username || user.emailAddress || "User"
      : "User",
    email: user?.emailAddress || "",
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open);
  };

  return (
    <header
      className={`bg-default-50 border-b border-default-200 z-50 transition-shadow ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto py-3 md:py-4 px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-10">
            <CloudUpload className="h-6 w-6 text-primary" />
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-300 drop-shadow-lg tracking-wide leading-tight">
              Droply
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4 items-center font-semibold text-cyan-400">
            <SignedOut>
              <Link href="/sign-in">
                <Button
                  variant="flat"
                  className="border border-cyan-500 rounded-xl transition duration-300 hover:shadow-lg hover:shadow-cyan-400/50 hover:border-cyan-300 text-cyan-300"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  variant="solid"
                  className="border border-cyan-500 bg-cyan-600 text-white rounded-xl transition duration-300 hover:shadow-lg hover:shadow-cyan-400/50 hover:border-cyan-300"
                >
                  Sign Up
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-4">
                {/* Hide Dashboard button if already on dashboard */}
                {!isOnDashboard && (
                  <Link href="/dashboard">
                    <Button
                      variant="flat"
                      className="border border-cyan-500 text-cyan-300 rounded-xl transition duration-300 hover:shadow-lg hover:shadow-cyan-400/50 hover:border-cyan-300"
                    >
                      Dashboard
                    </Button>
                  </Link>
                )}

                {/* User dropdown */}
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="flat"
                      className="p-0 bg-transparent min-w-0 hover:shadow-md hover:shadow-cyan-400/50 transition duration-300"
                      endContent={
                        <ChevronDown className="h-2 w-4 ml-2 text-cyan-300" />
                      }
                    >
                      <div className="flex items-center gap-2">
                        <Avatar
                          name={userDetails.initials}
                          size="sm"
                          src={user?.imageUrl || undefined}
                          className="h-8 w-8 flex-shrink-0 border border-cyan-500"
                          fallback={<User className="h-4 w-4 text-cyan-300" />}
                        />
                        <span className="text-cyan-300 hidden sm:inline">
                          {userDetails.displayName}
                        </span>
                      </div>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="User actions"
                    className="bg-gray-800 text-cyan-300 border border-cyan-600"
                  >
                    <DropdownItem
                      key="profile"
                      description={userDetails.email || "View your profile"}
                      onClick={() => router.push("/dashboard?tab=profile")}
                    >
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      key="files"
                      description="Manage your files"
                      onClick={() => router.push("/dashboard")}
                    >
                      My Files
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      description="Sign out of your account"
                      className="text-red-400 hover:text-red-300"
                      color="danger"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Show avatar only inside the mobile menu, not next to hamburger */}
            {/* So we remove avatar here */}

            <button
              className="z-50 p-2 rounded-lg border border-cyan-500 text-cyan-400 hover:bg-cyan-600 hover:text-white transition duration-300"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              data-menu-button="true"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Side Menu Drawer */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-gray-900 text-cyan-200 z-50 flex flex-col pt-20 px-6 shadow-xl border-l-4 border-cyan-500 transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <SignedOut>
          <div className="flex flex-col gap-4 items-center">
            <Link
              href="/sign-in"
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button
                variant="flat"
                className="w-full border border-cyan-500 rounded-xl text-cyan-300 transition duration-300 hover:shadow-lg hover:shadow-cyan-400/50 hover:border-cyan-300"
              >
                Sign In
              </Button>
            </Link>
            <Link
              href="/sign-up"
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button
                variant="solid"
                className="w-full border border-cyan-500 rounded-xl bg-cyan-700 text-white transition duration-300 hover:shadow-lg hover:shadow-cyan-400/50 hover:border-cyan-300"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex flex-col gap-6 text-cyan-200">
            {/* User info */}
            <div className="flex items-center gap-3 py-4 border-b border-cyan-700">
              <Avatar
                name={userDetails.initials}
                size="md"
                src={user?.imageUrl || undefined}
                className="h-10 w-10 flex-shrink-0 border-2 border-cyan-500 rounded-full"
                fallback={<User className="h-5 w-5 text-cyan-400" />}
              />
              <div>
                <p className="font-semibold text-cyan-400">{userDetails.displayName}</p>
                <p className="text-sm text-cyan-300">{userDetails.email}</p>
              </div>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col gap-4">
              {!isOnDashboard && (
                <Link
                  href="/dashboard"
                  className="py-2 px-3 rounded-xl hover:bg-cyan-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link
                href="/dashboard?tab=profile"
                className="py-2 px-3 rounded-xl hover:bg-cyan-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                className="py-2 px-3 text-left rounded-xl text-red-500 hover:bg-red-700 hover:text-red-300 transition-colors mt-4"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSignOut();
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </SignedIn>
      </div>
    </header>
  );
}
