<!DOCTYPE html>
<html>

<head>
    <title>Register Mail</title>
</head>

<body>
    <h1>Welcome {{ $email }}!</h1>
    <p>Thank you for joining our platform.</p>

    <p>{{ $signedUrl }}</p>

    <a href="{{ $signedUrl }}">
        <button>Register</button>
    </a>
</body>

</html>
