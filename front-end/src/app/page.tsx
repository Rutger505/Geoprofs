export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <div className="-mt-20 w-full max-w-md space-y-10 p-8">
        <h1 className="text-center text-4xl font-bold text-gray-900">
          Inloggen
        </h1>

        <form className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Wachtwoord
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Inloggen
            </button>

            <button
              type="button"
              className="w-full rounded-md px-4 py-2 text-sm text-gray-500 transition-colors hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Wachtwoord vergeten
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
