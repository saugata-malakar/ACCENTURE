import sys
import os

# Ensure kpi_engine is first in python path
_kpi_dir = os.path.join(os.path.dirname(__file__), "kpi_engine")
if _kpi_dir not in sys.path:
    sys.path.insert(0, _kpi_dir)

import importlib.util
_spec = importlib.util.spec_from_file_location("kpi_engine_main_app", os.path.join(_kpi_dir, "app.py"))
_kpi_mod = importlib.util.module_from_spec(_spec)
sys.modules["kpi_engine_main_app"] = _kpi_mod
_spec.loader.exec_module(_kpi_mod)

app = _kpi_mod.app
