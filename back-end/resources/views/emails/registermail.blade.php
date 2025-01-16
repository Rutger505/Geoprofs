<!DOCTYPE html>
<html lang="nl">
<head>
    <title>Registratie E-mail</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; min-height: 100vh; font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center;">
    <div style="max-width: 300px; width: 90%; margin: 20px auto; padding: 24px; border-radius: 8px;">
        <div style="margin-bottom: 24px;">
            <h1 style="color: #111827; font-size: 24px; font-weight: 600; margin-bottom: 16px; text-align: center;">Welkom!</h1>
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 24px; text-align: center;">Bedankt voor het aanmelden op ons platform. Klik op de onderstaande knop om je account te registreren.</p>
        </div>

        <a href="{{ $signedUrl }}" style="width: fit-content;  margin: 0 auto; display: block; text-decoration: none;  padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: 500; transition: background-color 0.2s;">
                Registreren
            </button>
        </a>
    </div>
</body>
</html>
