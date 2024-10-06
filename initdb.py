import sqlite3
import json

SORT_ORDER = [
    
]

# Connect to an SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('./db/products.db')

# Create a cursor object to execute SQL queries
cursor = conn.cursor()

# Create a table for storing product information
cursor.execute('''
CREATE TABLE IF NOT EXISTS Products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    imageUrl TEXT,
    fullPrice TEXT,
    price TEXT
)
''')

# Create Votes table with foreign key to Product table
cursor.execute('''
CREATE TABLE IF NOT EXISTS Votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER,
    ipAddress TEXT,
    submittedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (productId) REFERENCES Products(id)
)
''')

# Create PriceModifiers table to store profit percentage and rounding modifier
cursor.execute('''
CREATE TABLE IF NOT EXISTS PriceModifiers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profitPercentage REAL,
    roundingModifier REAL
)
''')


# Function to insert a product into the table
def insert_product(id, name, imageUrl, fullPrice, price):
    cursor.execute('''
    INSERT INTO Products (id, name, imageUrl, fullPrice, price)
    VALUES (?, ?, ?, ?, ?)
    ''', (id, name, imageUrl, fullPrice, price))
    conn.commit()

with open('./data/items.json') as fp:
    all_items = json.load(fp)

for item in all_items:
    item_id = int(item['productId'])
    name = item['name']
    imageUrl = item['viewSection']['itemImage']['url']
    price = item['price']['viewSection']['priceString']
    assert(price is not None)
    fullPrice = item['price']['viewSection']['fullPriceString']
    fullPrice = fullPrice if fullPrice is not None else price

    insert_product(item_id, name, imageUrl, fullPrice, price)

cursor.execute('''
INSERT INTO PriceModifiers (profitPercentage, roundingModifier)
VALUES (? , ?)
''', (.10, .25))
conn.commit()

# Close the database connection when done
conn.close()
