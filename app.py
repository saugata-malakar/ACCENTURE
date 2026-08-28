import sys
import os

# Add kpi_engine directory to python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "kpi_engine"))

from app import app
