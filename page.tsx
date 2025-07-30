export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-16">
      <h1 className="text-5xl font-bold mb-6">Welcome to Simplerun</h1>
      <p className="text-lg text-gray-600 mb-10">
        A clean and professional layout with authentication and billing
      </p>
      <a
        href="https://simplerun.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out">
          Launch App
        </button>
      </a>
    </section>
  );
}
