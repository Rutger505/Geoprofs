export default function Page() {
  return (
    <main className="flex items-center justify-center">
          <div>
            <h1>Account aanmaken voor</h1>

            <form action="">
              <input type="text" name="email" id="" />

              <div>
                <input type="text" name="first_name" id="" />
                <input type="text" name="last_name" id="" />
              </div>

              <input type="date" />

              <select name="account type" id="">
                <option value="">werknemer</option>
              </select>

            </form>
          </div>      
    </main>
  );
}
