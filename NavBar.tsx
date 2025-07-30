export default function NavBar() {
  return (
    <nav className="w-full bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">Simplerun</h1>
      <ul className="flex space-x-6">
        <li>
          <a href="/" className="hover:text-gray-300 transition">Home</a>
        </li>
        <li>
          <a href="/about" className="hover:text-gray-300 transition">About</a>
        </li>
      </ul>
    </nav>
  );
}
