
	
/**
    Bit of a stub file for the idea to store tracks in the localstorage but then became too cumbersome
    if implemented in future these notes might be useful on planning

    NOTE I think it would be easier to sync localStorage to the tracksTable if they both used the same index as their key
        Since index can only store a string we can either 
            store value as title,url (which might cause issues if title has crazy characters) 
            OR use url as key to then store the title
            OR use url as the key and store index,title (which we would know the first comma is ours to split on)
    The reason I was storing all tracks into a giant array was to make exporting quicker, but thats dumb, thats a less frequent operation
        than adding and removing would be, and would also be relatively easy to perform on the spot, its only like 100 rows or so (would never be more than 1000)

    50b roughly for url or title, 100b roughly for both
    currently all track urls in a single array would be roughly 5kb (100 tracks)
    that is 1/1000 of the available storage, 1/2000 if we shave down the youtube url to just the videoId param

    why are we storing them all in localStorage anyway?
    dont we only need to store the currentlyPlaying in there?
        is it as a backup just in case?, in which case we would only need to store the array of urls and work from there
    cant the play button get the rows url and send that to localStorage.currentlyPlaying and be done with it?
    
    */
