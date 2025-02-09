import { Box, Building2, Home, Layers, Lightbulb, Mail, Users } from "lucide-react";

export const menuItems = [
    { id: "home", label: "Home", href: "/", icon: Home },
    { id: "services", label: "Services", href: "/services", icon: Layers },
    { id: "about", label: "About", href: "/about", icon: Users },
    { id: "contact", label: "Contact", href: "/contact", icon: Mail },
  ];

 export const dropdownItems = [
    { id: "products", label: "Products", href: "/product", icon: Box },
    { id: "solutions", label: "Solutions", href: "#", icon: Lightbulb },
    { id: "enterprise", label: "Enterprise", href: "#", icon: Building2 },
  ];