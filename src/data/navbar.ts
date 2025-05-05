import { Box, Building2, Home, IdCardIcon, Layers, Lightbulb, Mail, User, Users, Wallet2 } from "lucide-react";

export const menuItems = [
    { id: "home", label: "Home", href: "/", icon: Home },
    { id: "services", label: "Services", href: "/services", icon: Layers },
    { id: "about", label: "About", href: "/about", icon: Users },
    { id: "contact", label: "Contact", href: "/contact", icon: Mail },
    { id: "profile", label: "Profile", href: "/profile", icon: User },
  ];

 export const dropdownItems = [
    { id: "products", label: "Products", href: "/product", icon: Box },
    { id: "tools", label: "Tools", href: "/tool", icon: Lightbulb },
    { id: "developer", label: "Developer", href: "/developer", icon: Building2 },
    { id: "wallet", label: "Wallet", href: "/wallet", icon: Wallet2 },
    { id: "invite", label: "Invite", href: "/invite", icon: IdCardIcon },


  ];