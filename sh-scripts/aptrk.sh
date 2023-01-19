#used as a cli shortcut to add track urls inside the clipboard

append_pbpaste_to_track () { 
    #check if link is a duplicate, if so dont add the link and echo "track already added"
    duplicateTrackCount=$(grep -c $(pbpaste) ~/.nb/tracks/tracks.md)

    if [[ duplicateTrackCount -gt 0 ]]
    then
        echo "Track already exists"
    else
        pbpaste | nb e tracks:1 #append to tracks.md
        sed -i '' '/^$/d' ~/.nb/tracks/tracks.txt #remove all blank lines from file
        echo "Success"
    fi
} 

<<<<<<< HEAD:sh-scripts/aptrk.sh
# Remove duplicate lines from a file, preserve original ordering, keep the first duplicate
# cat -n stuff.txt | sort -uk2 | sort -nk1 | cut -f2-

alias aptrk='append_pbpaste_to_track'
=======
alias aptrk='append_pbpaste_to_track'
>>>>>>> 9181e7f ([nb] Commit):aptrk.sh
