<!DOCTYPE html>
<html>

<head>
    <title>Register Mail</title>
</head>

<body>
    <h1>Welcome!</h1>
    <p>Thank you for joining our platform.</p>


    <p>url: {{ $signedUrl }}</p>
    <a href="{{ $signedUrl }}">
        <button>Register</button>
    </a>
</body>

</html>
