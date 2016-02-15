import os

DB_URI = os.environ.get('DATABASE_URL', 'postgresql://localhost/dsra')
TOKENFILE = "twitter-api-keys.yml"
LOGDIR = "/Users/aweng/git/dsra-twitter-app/logs/"
