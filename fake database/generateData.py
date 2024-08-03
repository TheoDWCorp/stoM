import json
import random

def read_json_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def write_json_file(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

input_file_path = './words.json'
data = read_json_file(input_file_path)

second_elements = [item[1] for item in data]

new_list = []
for item in data:
    first_two_elements = item
    random_elements = random.sample(second_elements, 3)
    new_item = first_two_elements + random_elements
    new_list.append(new_item)

output_file_path = './data.json'
write_json_file(output_file_path, new_list)

