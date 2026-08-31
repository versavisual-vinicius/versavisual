#!/bin/bash
cd public/images

mkdir -p artistas-videoclipes
mkdir -p ativacoes-eventos
mkdir -p casamentos
mkdir -p gestantes
mkdir -p hotelaria-lifestyle
mkdir -p imagem-pessoal-lifestyle
mkdir -p moda-campanhas
mkdir -p posicionamento-profissional

[ -d "Artistas & Videoclipes - Backstage Clipe Sururu" ] && mv "Artistas & Videoclipes - Backstage Clipe Sururu" "artistas-videoclipes/backstage-clipe-sururu"
[ -d "Ativações & Eventos - Bonfim House" ] && mv "Ativações & Eventos - Bonfim House" "ativacoes-eventos/bonfim-house"
[ -d "Ativações & Eventos - Camarote Ondina" ] && mv "Ativações & Eventos - Camarote Ondina" "ativacoes-eventos/camarote-ondina"
[ -d "Ativações & Eventos - Lançamento Drinkball" ] && mv "Ativações & Eventos - Lançamento Drinkball" "ativacoes-eventos/lancamento-drinkball"
[ -d "Ativações & Eventos - Mega Bloco Chá da Alice" ] && mv "Ativações & Eventos - Mega Bloco Chá da Alice" "ativacoes-eventos/mega-bloco-cha-da-alice"
[ -d "Ativações & Eventos - Syn Ice" ] && mv "Ativações & Eventos - Syn Ice" "ativacoes-eventos/syn-ice"
[ -d "Casamentos" ] && mv "Casamentos" "casamentos"
[ -d "Gestantes" ] && mv "Gestantes" "gestantes"
[ -d "Hotelaria & Lifestyle" ] && mv "Hotelaria & Lifestyle" "hotelaria-lifestyle"
[ -d "Imagem Pessoal & Lifestyle - Ensaio Autoral" ] && mv "Imagem Pessoal & Lifestyle - Ensaio Autoral" "imagem-pessoal-lifestyle/ensaio-autoral"
[ -d "Imagem Pessoal & Lifestyle - Ensaio Street" ] && mv "Imagem Pessoal & Lifestyle - Ensaio Street" "imagem-pessoal-lifestyle/ensaio-street"
[ -d "Moda & Campanhas - Fashion Manners" ] && mv "Moda & Campanhas - Fashion Manners" "moda-campanhas/fashion-manners"
[ -d "Moda & Campanhas - Festival Jeans Toritama" ] && mv "Moda & Campanhas - Festival Jeans Toritama" "moda-campanhas/festival-jeans-toritama"
[ -d "Moda & Campanhas - Santa Lolla" ] && mv "Moda & Campanhas - Santa Lolla" "moda-campanhas/santa-lolla"
[ -d "Posicionamento Profissional - Loja Frida" ] && mv "Posicionamento Profissional - Loja Frida" "posicionamento-profissional/loja-frida"

echo "Done moving files"
