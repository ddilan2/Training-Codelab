import sqlite3
from sqlite3 import Error
DATABASE_NAME = 'BitcoinDB-demo.db'
TABLE_NAME = 'Bitcoin'

#Connect to database
try: # always use a try-catch statement to prevent your programs from crashing in case of a failure
    #connect to database
    db = sqlite3.connect(DATABASE_NAME)
except Error as e:
    print(e)

#get cursor
cursor = db.cursor()

#define SQL query
sql = "SELECT * FROM '{}';".format(TABLE_NAME)

#execute sql query
cursor.execute(sql)

#fetch all results obtained
results = cursor.fetchall()

#close
cursor.close()

#print the results
print(results)

