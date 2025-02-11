
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <header className="w-full bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">My Awesome Website</h1>
      </header>
      <section className="mt-10">
        <h1 className="text-4xl font-semibold">Welcome to the Home Page</h1>
        <p className="mt-4 text-lg text-gray-700">Here you can find various resources and information.</p>
      </section>
      <footer className="w-full bg-blue-600 text-white p-4 text-center mt-auto">
        <p>&copy; 2025 My Awesome Website. All rights reserved.</p>
      </footer>
    </main>
  );
}
