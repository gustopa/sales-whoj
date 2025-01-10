<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    {{-- <link rel="icon" type="image/x-icon" href="{{ asset('icon.ico') }}" /> --}}
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
  </head>
  <body class="">
    @inertia
    <link
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  rel="stylesheet"
/>
  </body>
</html>