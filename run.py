from src.index import app
import os

app.run(host='0.0.0.0', port=os.environ.get('PORT'), use_reloader=False)