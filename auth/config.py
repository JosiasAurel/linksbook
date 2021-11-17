import dotenv
import os

dotenv.load_dotenv()
PROJECT_KEY =os.getenv("DETA_BASE_KEY")
SECRET = os.getenv("SECRET")
