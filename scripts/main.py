import os
import pandas as pd
from dotenv import load_dotenv
import psycopg2
load_dotenv()

# Replace these with your database credentials
db_params = {
    'dbname': os.getenv('DB_DATABSE'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'port': os.getenv('DB_PORT')
}



# Load the dataset
df = pd.read_csv('scripts/startup_funding.csv')
# Remove Sr col
df.drop(columns=['SNo'], inplace=True)

# Iterate over rows
# for i,item in df.head().iterrows():
# Close the cursor and connection
#     print(item)




# Connect to the PostgreSQL database
connection = psycopg2.connect(**db_params)

# Create a cursor object to interact with the database
cursor = connection.cursor()
print("Database Connected!")


cursor.close()
connection.close()