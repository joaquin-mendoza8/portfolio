import sys
import os

# Add the project root directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from src.index import app


app.run(host='0.0.0.0', port=os.environ.get('PORT'), use_reloader=False)