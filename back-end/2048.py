from logic import *
 
# Driver code
# calling start_game function
# to initialize the matrix

mat = start_game()

while(True):

    # taking the user input
    # for next step
    x = input("Press the command : ")
 
    # we have to move up
    if(x == 'W' or x == 'w'):
 
        # call the move_up function
        mat, flag = move_up(mat)
 
        # get the current state and print it
        status = get_current_state(mat)
        print(status)
 
        # if game not ove then continue
        # and add a new two
        if(status == 'GAME NOT OVER'):
            add_new_2(mat)
 
        # else break the loop
        else:
            break
 
    # the above process will be followed
    # in case of each type of move
    # below
 
    # to move down
    elif(x == 'S' or x == 's'):
        mat, flag = move_down(mat)
        status = get_current_state(mat)
        print(status)
        if(status == 'GAME NOT OVER'):
            add_new_2(mat)
        else:
            break
 
    # to move left
    elif(x == 'A' or x == 'a'):
        mat, flag = move_left(mat)
        status = get_current_state(mat)
        print(status)
        if(status == 'GAME NOT OVER'):
            add_new_2(mat)
        else:
            break
 
    # to move right
    elif(x == 'D' or x == 'd'):
        mat, flag = move_right(mat)
        status = get_current_state(mat)
        print(status)
        if(status == 'GAME NOT OVER'):
            add_new_2(mat)
        else:
            break
    else:
        print("Invalid Key Pressed")
 
    # print the matrix after each
    # move.
    for i in range(len(mat)):
        print(mat[i])