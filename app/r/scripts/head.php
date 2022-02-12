<?php
$theme = 'dark';
if (!empty($_COOKIE['theme']) && $_COOKIE['theme'] == 'light') {
  $theme = 'light';
}
if (!empty($_COOKIE['theme']) && $_COOKIE['theme'] == 'dark') {
    $theme = 'dark';
}
?>

<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Primary Meta Tags -->
<title>This-Cord</title>
<link rel="icon" type="image/svg+xml" href="../public/wolf-logo.svg">
<meta name="title" content="This-Cord - Discord of Wish">
<meta name="description" content="Connect with friends, build communities and chat. Discord clone with education purposes, don't sue me. SUS">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://paginas.fe.up.pt/~up201707238/sie/this-cord/app/r/">
<meta property="og:title" content="This-Cord - Discord of Wish">
<meta property="og:description" content="Connect with friends, build communities and chat. Discord clone with education purposes, don't sue me. SUS">
<meta property="og:image" content="https://paginas.fe.up.pt/~up201707238/sie/this-cord/app/public/metaimg.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://paginas.fe.up.pt/~up201707238/sie/this-cord/app/r/">
<meta property="twitter:title" content="This-Cord - Discord of Wish">
<meta property="twitter:description" content="Connect with friends, build communities and chat. Discord clone with education purposes, don't sue me. SUS">
<meta property="twitter:image" content="https://paginas.fe.up.pt/~up201707238/sie/this-cord/app/public/metaimg.jpg">

<!-- CSS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../styles/colors/<?php echo $theme; ?>.css">
<link rel="stylesheet" href="../styles/global.css">
<link rel="stylesheet" href="../styles/nav.css">
<link rel="stylesheet" href="../styles/modals.css">

<!-- JavaScript -->
<script src="../javascript/api.js" defer></script>
<script src="../javascript/components/modals.js" defer></script>
<script src="../javascript/components/nav.js" defer></script>
<script src="../javascript/components/user.js" defer></script>