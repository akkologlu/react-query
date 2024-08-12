import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/tqposts">Posts with Tanstack Query</Link>
      <Link href="/pagination">Pagination</Link>
      <Link href="/prefetch">Prefetch</Link>
    </nav>
  );
};

export default Navbar;
