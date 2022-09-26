todos

goals: anonymous/accountless, free, easy music saving and sharing for collecting playlists quickly and playing music easily. make youtubes music great again.
  
# Unsorted
//TODO Remove the newline from the appendFile function
//TODO Function that cleans up dead links?
//TODO function that cleans up duplicate links (or avoids adding it if its a duplicate)
//TODO function that alphabetises links (more so for radio.js)
//TODO add send to local tracks and close window option 
//TODO add visual confirmation that track has been added to the popup player
//TODO show error if track not sent (i.e. network error, server isnt up, whatever...)
//TODO add option to startup server from extension and then kill it after?
//TODO use a package that comes with node 
    https://github.com/mdn/content/blob/main/files/en-us/learn/server-side/node_server_without_framework/index.md
    https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module
//TODO read this Cache your CORS article https://news.ycombinator.com/item?id=32907234
//TODO add an option for the plugin to send it to cache, then have option in player to read from cache and save as a url maybe
//TODO add seashells theme, nightmode theme, css theme from that open source github hosted blog website

//TODO function that adds tags and can filter based on tags 
//TODO function that lets me remove tracks from the list inside the index file (thats a powerful feature to add to a public page so maybe not)?

# High
- [ ] get extension working to easily save track urls in browser tab to disk
- [ ] drag and drop feature to import songs from file
- [ ] export feature to save songs added
- [ ] TODO filter duplicates out
- [ ] TODO strike out videos that cant be played
- [ ] TODO add videos to table
- [ ] easily creatable/saveable anonymous playlists



# Med
- [ ] add option to append new track straight to github repo file
- [ ] have add local options but also save those as a bundle to a external repo
- [ ] maybe make seperate files and then bundle them up together into a single file that can be dropped into any repo
- [ ] maybe some easy way to save your playlist to a url (or disk) for use by people easily with git? that way it can be saved as a bookmark!


# Low
- [ ] add filters and tags
- [ ] consider adding mongodb read/write 
    - [ ] maybe make playlists social like how youtube used to be, let people discover other music like a webring
    - [ ] could do meta analysis then and look at most used tags, most saved track, users that share the most in common with you, suggested songs???
- [ ] setup an autosync feature that doesnt save them through bookmarks 
    - dunno about this one, nb-bookmarks works well and would only need to be done if extended to store/retriece track urls outside github


# Links
- autosyncing
    - https://stackoverflow.com/questions/3669636/automatically-keep-a-secondary-repo-in-sync-with-a-primary-repo
    - https://jakemccrary.com/blog/2020/02/25/auto-syncing-a-git-repository/
    - https://medium.com/swlh/how-to-auto-sync-update-from-one-github-repository-to-other-repository-using-github-workflow-6492f4830d45
    - https://github.com/simonthum/git-sync
    - https://github.com/GitJournal/git-auto-sync
    - https://medium.com/@ViBiOh/synchronize-git-enabled-folder-to-remote-with-fswatch-and-rsync-4b00bc52bfc9
