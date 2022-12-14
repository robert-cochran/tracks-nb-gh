#used as a cli shortcut to add track urls inside the clipboard

append_pbpaste_to_track () { 
    #check if link is a duplicate, if so dont add the link and echo "track already added"
    duplicateTrackCount=$(grep -c $(pbpaste) ~/.nb/tracks/tracks.md)

    if [[ duplicateTrackCount -gt 0 ]]
    then
        echo "Track already exists"
    else
        pbpaste | nb e tracks:1 #append to tracks.md
        sed -i '' '/^$/d' ~/.nb/tracks/tracks.md #remove all blank lines from file
        echo "Success"
    fi
} 

alias aptrk='append_pbpaste_to_track'