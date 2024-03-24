import re

def extract_data_from_html(html_file):
    with open(html_file, 'r', encoding='utf-8') as file:
        html_content = file.read()

    pattern = r'<td>(.*?)</td>\s*<td>(.*?)</td>\s*<td>(.*?)</td>'
    matches = re.findall(pattern, html_content)

    result = []
    for match in matches:
        result.append(f"{match[1]}, {match[2]}")

    return '\n'.join(result)

html_file = 'dataset.txt'  # Mettez le nom de votre fichier HTML ici
output = extract_data_from_html(html_file)
print(output)