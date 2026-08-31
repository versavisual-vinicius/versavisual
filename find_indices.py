import re

files_to_find = [
    "Camarote-Ondina-Salvador-Bahia-Carnaval3.jpg",
    "Festival-de-Jeans-de-toritama-FJT27.jpg",
    "Backstage-clipe-sururu-babado-novo8.jpg",
    "Ensaio-street1.jpg",
    "Ensaio-Autoral1.jpg",
    "CASAMENTO8.jpg",
    "Ensaio-Autoral23.jpg",
    "Hotelaria-life-style2.jpg"
]

with open('src/lib/images.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# find all array declarations
arrays = re.findall(r'export const ([A-Z_0-9]+) = \[([\s\S]*?)\]', content)

for name, items_str in arrays:
    items = [x.strip().strip('",') for x in items_str.split('\n') if x.strip()]
    for i, item in enumerate(items):
        for target in files_to_find:
            if target in item:
                print(f"{target} found in {name} at index {i}")
