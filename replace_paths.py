import os

file_path = 'src/lib/images.ts'

mapping = {
    "Artistas & Videoclipes - Backstage Clipe Sururu": "artistas-videoclipes/backstage-clipe-sururu",
    "Ativações & Eventos - Bonfim House": "ativacoes-eventos/bonfim-house",
    "Ativações & Eventos - Camarote Ondina": "ativacoes-eventos/camarote-ondina",
    "Ativações & Eventos - Lançamento Drinkball": "ativacoes-eventos/lancamento-drinkball",
    "Ativações & Eventos - Mega Bloco Chá da Alice": "ativacoes-eventos/mega-bloco-cha-da-alice",
    "Ativações & Eventos - Syn Ice": "ativacoes-eventos/syn-ice",
    "Casamentos/CASAMENTO": "casamentos/CASAMENTO", # special mapping if needed, wait Casamentos -> casamentos is enough
    "Casamentos": "casamentos",
    "Gestantes": "gestantes",
    "Hotelaria & Lifestyle": "hotelaria-lifestyle",
    "Imagem Pessoal & Lifestyle - Ensaio Autoral": "imagem-pessoal-lifestyle/ensaio-autoral",
    "Imagem Pessoal & Lifestyle - Ensaio Street": "imagem-pessoal-lifestyle/ensaio-street",
    "Moda & Campanhas - Fashion Manners": "moda-campanhas/fashion-manners",
    "Moda & Campanhas - Festival Jeans Toritama": "moda-campanhas/festival-jeans-toritama",
    "Moda & Campanhas - Santa Lolla": "moda-campanhas/santa-lolla",
    "Posicionamento Profissional - Loja Frida": "posicionamento-profissional/loja-frida"
}

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

for old, new in mapping.items():
    content = content.replace(f"/images/{old}/", f"/images/{new}/")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced successfully.")
