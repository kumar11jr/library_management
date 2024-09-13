import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li><Link href="/books">Books</Link></li>
        <li><Link href="/members">Members</Link></li>
        <li><Link href="/admin">Admin</Link></li>
        <li><Link href="/(auth)/login">Login</Link></li>
        <li><Link href="/(auth)/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
