TODOS

    GOALS:      anonymous/accountless, 
                free, 
                easy music saving and sharing for collecting playlists quickly 
                    and playing music easily. 
                make youtubes music great again.

# Next

    TASK:       speed!!
    CONTEXT:    loading the website is very slow now, 
    CAUSE IDEA: I'm assuming its something
                to do with using local storage to store and populate everything, 
                but it's really annoyingly slow on startup for such a simple 
                web app.
    CAUSE IDEA: it looks like loading the page tracks into the table is slow, 
                but i dont think that involves localstorage, so maybe this is 
                an issue of blocking processes and not localstorage
    CAUSE IDEA: video loading could be to do with waiting for tracks file to be 
                imported before the video can load, blocking that process
    IDEA:       turn page back into using html elements to store links and titles


    TASK:       bookmarks
    TODO:       create bookmark from tracks saved
    TODO:       read bookmark to update tracks
    TODO:       easily creatable/saveable anonymous playlists 
    
    TASK:       filter
    TODO:       have text box that will filter down the table to only titles 
                that contain a string match
                e.g. [macroblank] would filter down only macroblank songs


# High
    
    TASK:       playlist
    TODO:       playlist (use json to manange multiple?)
    TODO:       create radio out of playlist (i.e. shuffle a playlist so it 
                works almost like a radio)

    TASK:       Queue
    TODO:       allow arbitrary songs from main list to be placed into queue
    IDEA:       either have a window to show the next songs in the queue 
                or highlight the track rows with a number showing the queue 
                order theyre in

    TASK:       tags
    TODO:       lets user search through track list for tags
    IDEA:       save them in the html row element as an attribute

    TASK:       removing tracks class to avoid confusion/redundancy
    QUESTION:   do i need the Tracks class? 
                can I have model do what its doing (essentially tying current 
                track with tracks array)

    TASK:       unplayable videos
    TODO:       strike out videos that cant be played
    RELATED:    check track added through user input is an actual url? 
                (similar in function to check playable videos really)
    RELATED:    Function that cleans up dead links? 
                yt-player does this I saw, wonder if reactplayer offers this kind of option? 
                surely theres a url I can hit to check?

    TASK:       sync session backup, 
    NOTE:       the purpose behind this task is so that i dont lose tracks i find if the browser crashes or i forget to 
                save the current track list to somewhere more permanent
                basically trying to avoid me having to look through youtube again if ive already done it once to find a track i like, 
                if ive found it i want it to stay in the list permanently
    TODO:       store urls in localStorage to let user close out of tab and come back to urls they added before
                so if user closes tab and tracks has urls then it will populate table with those instead of the default list
    IDEA:       save urls with only their unique video id to save space
    IDEA:       when adding/deleting a track add a fading message that localStorage has been updated
    TODO:       when adding a new track, sync trackstable to localstorage.tracks first
    TODO:       delete button next to tracks, sync updated trackstable to localStorage.tracks
    TODO:       personal sync: using lsyncd i can continuously synchronize directory trees on local and remote server
    ISSUE:      how are merge conflicts resolved? 
                can they happen if its live? 
                what if the daemon dies and the file is updated differently on remote to what it is on local
        LINK:   lsyncd https://unix.stackexchange.com/questions/307046/real-time-file-synchronization
        LINK:   working rysnc to be lsyncd https://unix.stackexchange.com/questions/596039/how-to-sync-backup-files-whenever-change-is-detected
        LINK:   bidrectional updates using unison: https://unix.stackexchange.com/questions/596039/how-to-sync-backup-files-whenever-change-is-detected
        LINK:   jamsync, might not actually be relevant but found on HN and looked cool: https://news.ycombinator.com/item?id=34439461
    IDEA:       places i can store tracks: in the browser (temp), locally to file, dedicated server i host, mongodb, github

    TASK:       drag n drop
    TODO:       drag and drop feature to import songs from file
    LINK:       https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
    LINK:       https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#selecting_files_using_drag_and_drop
    LINK:       //https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API
    
    TASK:       custom context menu to reduce clutter
    TODO:       custom context menu to hide all the buttons?
    ISSUE:      how would a user know to even right click to get access to those features



# Unsorted

    TASK:       playing videos localhost vs public domain
    TODO:       fix some links not working inside the catalog index.html, 
                requesting to be viewed in youtube (e.g. macroblank) but 
                doesnt happen when played from github pages site

    TASK:       show which videos are live 
    TODO:       add a red live(()) option to the link like the live videos have

    TASK:       themes
    TODO        add seashells theme, nightmode theme, 
                css theme from that open source github hosted blog website
                
//TODO function that adds tags and can filter based on tags 
//TODO function that lets me remove tracks from the list inside the index file (thats a powerful feature to add to a public page so maybe not)?
- [ ] if theres a failure of import (or partial) of tracks file into page it might be because of bottleneck localstorage

//TODO keyboard command shortcut https://github.com/darktrojan/openwith/blob/master/webextension/manifest.json

## plugin 
//todo see if i cna use this in my quest to make plugin easier to use (and not deal with the whole mozilla plugin access thing https://web.dev/new-patterns-for-amazing-apps/)
//TODO if if move to extension generated index (isntead of github pages) how can i ensure the same level of data persistence like hosting it on github would provide?
    //whatever I do for tracks I could do for external sites, store it as a similar data structure somewhere
//TODO add send to local tracks and close window option 
//TODO add visual confirmation that track has been added to the popup player
//TODO show error if track not sent (i.e. network error, server isnt up, whatever...)
//TODO add option to startup server from extension and then kill it after?
//TODO read this Cache your CORS article https://news.ycombinator.com/item?id=32907234
//TODO add an option for the plugin to send it to cache, then have option in player to read from cache and save as a url maybe


# Med
- [ ] mini player in the extension to pause/play
- [ ] queue up tracks
- [ ] repeat/loop tracks
- [ ] create playlists
- [ ] add option to append new track straight to github repo file
- [ ] have add local options but also save those as a bundle to a external repo
- [ ] maybe make seperate files and then bundle them up together into a single file that can be dropped into any repo
- [ ] maybe some easy way to save your playlist to a url (or disk) for use by people easily with git? that way it can be saved as a bookmark!


# Low
- [ ] backend https://app.supabase.com/project/khzjxhtfjzyqaggtnmdh
- [ ] themes
    - https://github.com/hundredrabbits/Themes
    - drag and drop theme files mozilla
        - https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
        - https://support.mozilla.org/en-US/questions/1039987
        - https://superuser.com/questions/1652723/why-i-can-no-longer-drag-and-drop-files-into-firefox
        - https://stackoverflow.com/questions/53370893/drag-and-drop-file-upload-not-working-in-firefox
        - https://stackoverflow.com/questions/54474158/drag-and-drop-upload-not-working-in-mozilla
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
