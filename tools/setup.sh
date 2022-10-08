#include the code here that sets up the native messaging manifest needed to communicate from ext to bash

# if ~/Application\ Support/Mozilla/NativeMessagingHosts exists 
	# cp all the files from plugin/Mozilla into the above folder
	# chmod 777 for app files so they can be run by browser

# if above folder doesnt exist check for root folder /Library/Application\ Support/Mozilla/NativeMessagingHosts exists 
	# cp all the files from plugin/Mozilla into the above folder