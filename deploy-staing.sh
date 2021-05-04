#!/bin/bash
# Shell script to deploy staging environment

title="Select staging #"
prompt="Pick an option:"
options=("staging-red" "staging-red2" "staging-red3")

echo "$title"
PS3="$prompt"
select opt in "${options[@]}" "Quit"; do 
    case "$REPLY" in
    1|2|3) 
       echo "You picked $opt which is ${#options[@]}"
       echo "==== Removing the existing remote $opt branch ===="
       git push --delete origin $opt
       echo "==== Removing the existing local $opt branch ===="
       git branch -d $opt
       echo "==== Creating new $opt branch ===="
       git checkout -b $opt
       echo "==== Pushing $opt branch to orign ===="
       git push origin $opt
       echo "==== Done! ===="
       ;;
    $((${#options[@]}+1))) echo "Goodbye!"; break;;
    *) echo "Invalid option. Try another one.";continue;;
    esac
    break
done



