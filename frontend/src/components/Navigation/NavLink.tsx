import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const router = usePathname();
  const isActive = router === href;

  return (
    <Link href={href} 
    className={`p-2 duration-500 transition rounded-md ${isActive ? "bg-white bg-opacity-20" : ""}`}
    >
      {children}
    </Link>
  );
};

export { NavLink };
