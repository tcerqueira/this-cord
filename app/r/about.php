<?php
require 'scripts/StartSession.php';
require 'scripts/SendHeaders.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include "scripts/head.php" ?>
    <link rel="stylesheet" href="../styles/settings.css">
    <script src="../javascript/guild-settings.js" defer></script>
</head>
<body>
    <div class="settings-container global-container">
        <?php include "../components/nav-about.php" ?>
        
       <div class="settings-display">
            <a href="home.php">
                <div class="esc" id="esc-guild-settings">
                    <img src="../public/esc.svg" alt="esc">
                </div>
            </a>
            <section class="guild-section" id="description">
                <h2>Description</h2>    
                <div class="guild-sections-container">
                    <span>O Discord é uma aplicação usada para escrever mensagens, fazer videochamadas entre muitas outras funcionalidades.
                        Como tem a possibilidade de estar dividido em servers com várias pessoas em cada um, decidido pelo criador do 
                        server quem são essas pessoas torna-se muito útil para conversar com amigos e para a realização de trabalhos de 
                        grupo, não sendo preciso estar constantemente a criar reuniões. Com o aparecimento da pandemia começamos a 
                        utilizá-lo praticamente todos os dias. Daí pareceu-nos interessante replicar um pouco as suas funcionalidades 
                        neste trabalho, mais simples, sem funções de vídeo chamada e de partilha de ecrã mas com base na ideia de poder 
                        criar vários servers e dentro desses servers há a possibilidade de ter channels diferentes onde podemos estar a 
                        ter conversas diferentes, tornando tudo muito organizado. Assim surgiu a ideia de criarmos o nosso This-Cord.</span>
                </div>
            </section>

            <section class="guild-section" id="creators">
                <h2>Creators</h2>
                <div class="guild-sections-container">
                    <p><b>Name:</b> Pedro Aidos</p>
                    <p><b>Email:</b> up201706842@edu.fe.up.pt</p>
                    <p><b>Name:</b> Tiago Cerqueira</p>
                    <p><b>Email:</b> up201707238@edu.fe.up.pt</p>
                    <div class="settings-item">
                        <img class="creators-img" src="../public/Cerqueira.png" alt="">
                        <img class="creators-img" src="../public/Pedro.jpg" alt="">
                    </div>
               </div>
            </section>
           
            <section class="guild-section" id="Downloads">
                <h2>Downloads</h2>
                <div class="guild-sections-container">
                    <div class="settings-item">
                        <a id="javascriptSvg" href="../javascript/javascript.zip" download class="download-icon" data-tooltip="Download JS Files" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.775l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z"></path></svg>
                        </a>
                        <a id="cssSvg" href="../style/css.zip" download class="download-icon" data-tooltip="Download CSS Files">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M4.192 3.143h15.615l-1.42 16.034-6.404 1.812-6.369-1.813L4.192 3.143zM16.9 6.424l-9.8-.002.158 1.949 7.529.002-.189 2.02H9.66l.179 1.913h4.597l-.272 2.62-2.164.598-2.197-.603-.141-1.569h-1.94l.216 2.867L12 17.484l3.995-1.137.905-9.923z"></path></svg>
                        </a>
                        <a id="phpSvg" href="../php.zip" download class="download-icon" data-tooltip="Download PHP Files">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2.15 16.78h1.57a.14.14 0 0 0 .14-.12l.35-1.82h1.22a4.88 4.88 0 0 0 1.51-.2A2.79 2.79 0 0 0 8 14a3.18 3.18 0 0 0 .67-.85 3.43 3.43 0 0 0 .36-1 2.43 2.43 0 0 0-.41-2.16 2.64 2.64 0 0 0-2.09-.78h-3a.16.16 0 0 0-.15.13L2 16.6a.19.19 0 0 0 0 .13.17.17 0 0 0 .15.05zM5 10.62h1a1.45 1.45 0 0 1 1.08.29c.17.18.2.52.11 1a1.81 1.81 0 0 1-.57 1.12 2.17 2.17 0 0 1-1.33.33h-.8zm9.8-.95a2.7 2.7 0 0 0-1.88-.51h-1.19l.33-1.76a.15.15 0 0 0 0-.13.16.16 0 0 0-.11 0h-1.57a.14.14 0 0 0-.14.12l-1.38 7.27a.13.13 0 0 0 0 .12.13.13 0 0 0 .11.06h1.54a.14.14 0 0 0 .14-.13l.77-4.07h1.11c.45 0 .61.1.66.16a.81.81 0 0 1 0 .62l-.61 3.24a.13.13 0 0 0 0 .12.14.14 0 0 0 .11.06h1.56a.16.16 0 0 0 .15-.13l.64-3.4a1.7 1.7 0 0 0-.24-1.64zm4.52-.51h-3.13a.14.14 0 0 0-.15.13l-1.46 7.31a.16.16 0 0 0 0 .13.14.14 0 0 0 .11.05h1.63a.14.14 0 0 0 .15-.12l.37-1.82h1.27a5.28 5.28 0 0 0 1.56-.2 3 3 0 0 0 1.18-.64 3.31 3.31 0 0 0 .7-.85 3.45 3.45 0 0 0 .37-1 2.38 2.38 0 0 0-.42-2.16 2.81 2.81 0 0 0-2.18-.83zm.62 2.77a1.83 1.83 0 0 1-.6 1.12 2.28 2.28 0 0 1-1.37.33h-.8l.54-2.76h1a1.6 1.6 0 0 1 1.13.29c.16.18.16.52.1 1.02z"></path></svg>
                        </a>
                        <a id="apiSvg" href="../../api/api.zip" download class="download-icon" data-tooltip="Download API Files">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M20 3H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 9V5h16v4zm16 4H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zM4 19v-4h16v4z"></path><path d="M17 6h2v2h-2zm-3 0h2v2h-2zm3 10h2v2h-2zm-3 0h2v2h-2z"></path></svg>
                        </a>
                    </div>
                </div>
            </section>  
           
       </div>


    </div>
</body>
</html>