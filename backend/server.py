from fastapi import FastAPI, Request
from fastapi_utils.tasks import repeat_every
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json 
from datetime import datetime
from constants import CORS_URLS
from bitcoin_timestamp import BitcoinTimestamp
from custom_util import get_live_bitcoin_price, convert_date_to_text
from database_connection import DatabaseConnection

#define FastAPI app
app = FastAPI()
db = DatabaseConnection()


#  add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_URLS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

"""
a index function to test if server is running
"""
@app.get('/')
async def root():
    content = {"message": "Hello World! This is a bitcoin monitoring service!"}
    return json.dumps(content)


"""
repeated task to update bitcoin prices periodically
"""

@app.on_event("startup")
@repeat_every(seconds=15)
async def update_bitcoin_prices():
    price = get_live_bitcoin_price()
    if price != -1:
        db.insert_timestamp(BitcoinTimestamp(convert_date_to_text(datetime.now()), price))

"""
API endpoint to get bitcoin prices

:return:
    a list of bitcoinstamps
:rtype:
    json
"""
@app.get('/get_bitcoin_prices')
async def get_bitcoin_prices():
    prices = db.get_all_timestampes()
    json_prices = []
    for price in prices:
        json_prices.append(price.__dict__)
    return json.dumps(json_prices)


# main function to run the server
if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000)
    