#!/usr/bin/python
import yaml
import os
from birdy.twitter import StreamClient
import json
import re
import sys
import config
from time import strftime

tokenfile = config.TOKENFILE
logdir = config.LOGDIR
keywords_string = 'school'
print "Tracking tweets with these keywords:", keywords_string

# Connect to Twitter
tokens = yaml.safe_load(open(tokenfile))
client = StreamClient(tokens['consumer_key'],tokens['consumer_secret'],
    tokens['access_token'],tokens['access_secret'])
    
def getTwritterStreaming(keywords=None, users=None, hashtags=None, boundingBox=None):

	keywords_string=''
	users_string=''
	hashtags_string=''  
	if keywords!=None:
		if len(keywords)>1:
			print len(keywords), 'number of keywords'
			keywords_string = ','.join(set(keywords))
		else:
			keywords_string = keywords[0]	
	if users!=None:	
		if len(users)>1:
			users_string=','.join(set(users))
		else:
			users_string=users[0]
	if hashtags!=None:
		if len(hashtags)>1:
			hashtags_string=','.join(set(hashtags))
		else:
			hashtags_string=hashtags[0]	
	print "Tracking tweets with these keywords:", keywords_string, " follow users:", users_string, "hashtags_string:", hashtags_string
	if boundingBox!=None:
		resource = client.stream.statuses.filter.post( track=keywords_string)
	else:
		resource = client.stream.statuses.filter.post( track=keywords_string, locations=boundingBox)

	today = strftime("%Y-%m-%d")
	tweetlogfilename = logdir + 'tweets-' + keywords_string + '-' + today + '.log'
	try:
		print "Opening ", tweetlogfilename
		tweetlog = open(tweetlogfilename, "a")
	except:
		print "Unable to open tweet log file."
		sys.exit()
	print "Writing tweets to ", tweetlogfilename

	for data in resource.stream():
   		if today != strftime("%Y-%m-%d"):
   			today = strftime("%Y-%m-%d")
   			tweetlog.close()
       		tweetlogfilename = logdir + 'tweets-' + \
            	keywords_string + '-' + today + '.log'
       		try:
           		print "Opening ", tweetlogfilename
           		tweetlog = open(tweetlogfilename, "a")
       		except:
           		print "Unable to open tweet log file."
           		sys.exit()
   		tweetlog.write(json.dumps(data) + '\n')
   		if 'text' in data:
   			print data['text'].encode('utf-8')
  
#test the function with keywords from arguments
#getTwritterStreaming(keywords=sys.argv[1:])
 
