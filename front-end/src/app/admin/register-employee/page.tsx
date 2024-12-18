"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Roles {
  RoleID: number;
  RoleName: string;
}

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [roles, setRoles] = useState<Roles[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateHired, setDateHired] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const postData = async () => {
    try {
      const payload = {
        email: email,
        first_name: firstName,
        last_name: lastName,
        date_hired: dateHired,
        role: roles.find(
          (role) =>
            role.RoleID ===
            Number(document.getElementById("account_type")?.value),
        )?.RoleID,
      };

      const response = await axios.post("/api/auth/register", payload);

      console.log("Data successfully posted:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("/api/roles/show");
        setRoles(response.data.roles); // Update roles state
      } catch (err) {
        setError("Failed to fetch roles.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return (
    <main className="flex items-center justify-center">
      <div>
        <h1>Account aanmaken voor</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            postData();
          }}
        >
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />

          <div>
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="First Name"
              onChange={(event) => setFirstName(event.target.value)}
            />
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Last Name"
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>

          <input
            type="date"
            name="date_hired"
            id="date_hired"
            onChange={(event) => setDateHired(event.target.value)}
          />

          <select name="account_type" id="account_type" disabled={loading}>
            {loading && <option>Loading...</option>}
            {error && <option>{error}</option>}
            {!loading &&
              !error &&
              roles.map((role) => (
                <option key={role.RoleID} value={role.RoleID}>
                  {role.RoleName}
                </option>
              ))}
          </select>

          <button type="submit">submit</button>
        </form>
      </div>
    </main>
  );
}
