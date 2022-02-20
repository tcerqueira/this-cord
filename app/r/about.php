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
                        <a id="phpSvg" href="../app.zip" download class="download-icon" data-tooltip="Download PHP Files">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2.15 16.78h1.57a.14.14 0 0 0 .14-.12l.35-1.82h1.22a4.88 4.88 0 0 0 1.51-.2A2.79 2.79 0 0 0 8 14a3.18 3.18 0 0 0 .67-.85 3.43 3.43 0 0 0 .36-1 2.43 2.43 0 0 0-.41-2.16 2.64 2.64 0 0 0-2.09-.78h-3a.16.16 0 0 0-.15.13L2 16.6a.19.19 0 0 0 0 .13.17.17 0 0 0 .15.05zM5 10.62h1a1.45 1.45 0 0 1 1.08.29c.17.18.2.52.11 1a1.81 1.81 0 0 1-.57 1.12 2.17 2.17 0 0 1-1.33.33h-.8zm9.8-.95a2.7 2.7 0 0 0-1.88-.51h-1.19l.33-1.76a.15.15 0 0 0 0-.13.16.16 0 0 0-.11 0h-1.57a.14.14 0 0 0-.14.12l-1.38 7.27a.13.13 0 0 0 0 .12.13.13 0 0 0 .11.06h1.54a.14.14 0 0 0 .14-.13l.77-4.07h1.11c.45 0 .61.1.66.16a.81.81 0 0 1 0 .62l-.61 3.24a.13.13 0 0 0 0 .12.14.14 0 0 0 .11.06h1.56a.16.16 0 0 0 .15-.13l.64-3.4a1.7 1.7 0 0 0-.24-1.64zm4.52-.51h-3.13a.14.14 0 0 0-.15.13l-1.46 7.31a.16.16 0 0 0 0 .13.14.14 0 0 0 .11.05h1.63a.14.14 0 0 0 .15-.12l.37-1.82h1.27a5.28 5.28 0 0 0 1.56-.2 3 3 0 0 0 1.18-.64 3.31 3.31 0 0 0 .7-.85 3.45 3.45 0 0 0 .37-1 2.38 2.38 0 0 0-.42-2.16 2.81 2.81 0 0 0-2.18-.83zm.62 2.77a1.83 1.83 0 0 1-.6 1.12 2.28 2.28 0 0 1-1.37.33h-.8l.54-2.76h1a1.6 1.6 0 0 1 1.13.29c.16.18.16.52.1 1.02z"></path></svg>
                        </a>
                        <a id="apiSvg" href="../../api/api.zip" download class="download-icon" data-tooltip="Download API Files">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M20 3H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 9V5h16v4zm16 4H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zM4 19v-4h16v4z"></path><path d="M17 6h2v2h-2zm-3 0h2v2h-2zm3 10h2v2h-2zm-3 0h2v2h-2z"></path></svg>
                        </a>
                        <a id="pptSvg" href="../../Relatorio SIE.pptx" download class="download-icon" data-tooltip="Download PowerPoint">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"><path d="M 13.423828 1.0058594 L 0.42382812 3.0058594 C 0.17982812 3.0428594 0 3.253 0 3.5 L 0 21.5 C 0 21.747 0.17982813 21.957141 0.42382812 21.994141 L 13.423828 23.994141 C 13.448828 23.998141 13.475 24 13.5 24 C 13.619 24 13.734172 23.957906 13.826172 23.878906 C 13.937172 23.784906 14 23.646 14 23.5 L 14 21 L 23.5 21 C 23.776 21 24 20.776 24 20.5 L 24 4.5 C 24 4.224 23.776 4 23.5 4 L 14 4 L 14 1.5 C 14 1.354 13.937172 1.2150937 13.826172 1.1210938 C 13.716172 1.0260938 13.567828 0.98485937 13.423828 1.0058594 z M 13 2.0820312 L 13 4.5 L 13 20.5 L 13 22.917969 L 1 21.070312 L 1 3.9296875 L 13 2.0820312 z M 14 5 L 23 5 L 23 20 L 14 20 L 14 19 L 20.5 19 C 20.776 19 21 18.776 21 18.5 C 21 18.224 20.776 18 20.5 18 L 14 18 L 14 17 L 20.5 17 C 20.776 17 21 16.776 21 16.5 C 21 16.224 20.776 16 20.5 16 L 14 16 L 14 13.943359 C 14.63587 14.59388 15.520566 15 16.5 15 C 18.43 15 20 13.43 20 11.5 C 20 11.224 19.776 11 19.5 11 L 17 11 L 17 8.5 C 17 8.224 16.776 8 16.5 8 C 15.520566 8 14.63587 8.4061203 14 9.0566406 L 14 5 z M 18.5 6 C 18.224 6 18 6.224 18 6.5 L 18 9.5 C 18 9.776 18.224 10 18.5 10 L 21.5 10 C 21.776 10 22 9.776 22 9.5 C 22 7.57 20.43 6 18.5 6 z M 19 7.0507812 C 19.978 7.2507812 20.749219 8.022 20.949219 9 L 19 9 L 19 7.0507812 z M 4.5 8.0390625 C 4.224 8.0390625 4 8.2630625 4 8.5390625 L 4 13.5 L 4 16.539062 C 4 16.815063 4.224 17.039062 4.5 17.039062 C 4.776 17.039062 5 16.815062 5 16.539062 L 5 14 L 7.5195312 14 C 9.1625313 14 10.5 12.662531 10.5 11.019531 C 10.5 9.3765312 9.1635313 8.0390625 7.5195312 8.0390625 L 4.5 8.0390625 z M 5 9.0390625 L 7.5195312 9.0390625 C 8.6105313 9.0390625 9.5 9.9285312 9.5 11.019531 C 9.5 12.110531 8.6115313 13 7.5195312 13 L 5 13 L 5 9.0390625 z M 16 9.0507812 L 16 11.5 C 16 11.776 16.224 12 16.5 12 L 18.949219 12 C 18.716219 13.14 17.708 14 16.5 14 C 15.122 14 14 12.878 14 11.5 C 14 10.292 14.86 9.2827812 16 9.0507812 z"></path></svg>
                        </a>
                    </div>
                </div>
            </section class="guild-section" id="other informations"> 
                <div class="guild-sections-container">
                    <span>
                        As permissões vão ser diferentes para dependo dos roles que cada utilizador tem dentro dos servers, ou seja criando um server fica o admin do mesmo, e depois os utilizadores convidados para o server vão ter permissões diferentes de acordo com a tabela apresentada no relatório.

                    </span>
                    <p>
                        É possível criar várias contas. 
                    </p>
                    <p>
                        Conta exemplo: admin:titi   password:titi
                    </p>
                </div> 
            <section>

            </section>
           
       </div>


    </div>
</body>
</html>