#!/bin/bash
# Shell script to deploy staging environment

title="Select staging #"
prompt="Pick an option:"
options=("staging-red" "staging-red2" "staging-red3")

echo "$title"
PS3="$prompt"
select opt in "${options[@]}" "Quit"; do 
    case "$REPLY" in
    1) echo "You picked $opt which is option 1"
       git push --delete origin $opt
       git branch -d $opt
       git checkout -b $opt
       git push origin $opt
       ;;
    2) echo "You picked $opt which is option 2";;
    3) echo "You picked $opt which is option 3";;
    $((${#options[@]}+1))) echo "Goodbye!"; break;;
    *) echo "Invalid option. Try another one.";continue;;
    esac
    break
done



