import sqlite3
import json

# Connect to an SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('./db/products.db')

# Create a cursor object to execute SQL queries
cursor = conn.cursor()

# Create a table for storing product information
cursor.execute('''
CREATE TABLE IF NOT EXISTS Product (
    id INTEGER PRIMARY KEY,
    votes INTEGER,
    name TEXT,
    imageUrl TEXT,
    fullPrice TEXT,
    price TEXT
)
''')

# Function to insert a product into the table
def insert_product(id, votes, name, imageUrl, fullPrice, price):
    cursor.execute('''
    INSERT INTO Product (id, votes, name, imageUrl, fullPrice, price)
    VALUES (?, ?, ?, ?, ?, ?)
    ''', (id, votes, name, imageUrl, fullPrice, price))
    conn.commit()

with open('./data/items.json') as fp:
    all_items = json.load(fp)

for item in all_items:
    item_id = int(item['productId'])
    votes = 0
    name = item['name']
    imageUrl = item['viewSection']['itemImage']['url']
    price = item['price']['viewSection']['priceString']
    assert(price is not None)
    fullPrice = item['price']['viewSection']['fullPriceString']
    fullPrice = fullPrice if fullPrice is not None else price

    print(price, fullPrice, item['price'])

    insert_product(item_id, votes, name, imageUrl, fullPrice, price)

# Close the database connection when done
conn.close()
