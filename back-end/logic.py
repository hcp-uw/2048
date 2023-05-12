# logic.py to be
# imported in the 2048.py file
 
# importing random package
# for methods to generate random
# numbers.
import random
 
# function to initialize game / grid
# at the start

def test():
	print("hello world")

	
def start_game():
 
    # declaring an empty list then
    # appending 4 list each with four
    # elements as 0.

    rows = int(input("Enter rows : "))
    cols = int(input("Enter columns : "))
    mat = []
    for i in range(rows):
        mat.append([0] * cols)
 
    # printing controls for user
    print("Commands are as follows : ")
    print("'W' or 'w' : Move Up")
    print("'S' or 's' : Move Down")
    print("'A' or 'a' : Move Left")
    print("'D' or 'd' : Move Right")
 
    # calling the function to add
    # a new 2 in grid after every step
    add_new_2(mat)
    return mat
 
# function to add a new 2 in
# grid at any random empty cell
def add_new_2(mat):

    rows = len(mat)
    cols = len(mat[0])
 
   # choosing a random index for
   # row and column.
    r = random.randint(0, rows-1)
    c = random.randint(0, cols-1)
 
    # while loop will break as the
    # random cell chosen will be empty
    # (or contains zero)
    while(mat[r][c] != 0):
        r = random.randint(0, rows-1)
        c = random.randint(0, cols-1)
 
    # we will place a 2 at that empty
    # random cell.
    mat[r][c] = 2
 
# function to get the current
# state of game
def get_current_state(mat):

    rows = len(mat)
    cols = len(mat[0])
 
    # if any cell contains
    # 2048 we have won
    for i in range(rows):
        for j in range(cols):
            if(mat[i][j] == 2048):
                return 'WON'
 
    # if we are still left with
    # atleast one empty cell
    # game is not yet over
    for i in range(rows):
        for j in range(cols):
            if(mat[i][j] == 0):
                return 'GAME NOT OVER'
 
    # or if no cell is empty now
    # but if after any move left, right,
    # up or down, if any two cells
    # gets merged and create an empty
    # cell then also game is not yet over
    for i in range(rows-1):
        for j in range(cols-1):
            if(mat[i][j] == mat[i + 1][j] or mat[i][j] == mat[i][j + 1]):
                return 'GAME NOT OVER'
 
    for j in range(cols-1):
        if(mat[rows - 1][j] == mat[rows - 1][j + 1]):
            return 'GAME NOT OVER'
 
    for i in range(rows-1):
        if(mat[i][cols - 1] == mat[i + 1][cols - 1]):
            return 'GAME NOT OVER'
 
    # else we have lost the game
    return 'LOST'
 
# all the functions defined below
# are for left swap initially.
 
# function to compress the grid
# after every step before and
# after merging cells.
def compress(mat):

    rows = len(mat)
    cols = len(mat[0])
 
    # bool variable to determine
    # any change happened or not
    changed = False
 
    # empty grid
    new_mat = []
 
    # with all cells empty
    for i in range(rows):
        new_mat.append([0] * cols)
         
    # here we will shift entries
    # of each cell to it's extreme
    # left row by row
    # loop to traverse rows
    for i in range(rows):
        pos = 0
 
        # loop to traverse each column
        # in respective row
        for j in range(cols):
            if(mat[i][j] != 0):
                 
                # if cell is non empty then
                # we will shift it's number to
                # previous empty cell in that row
                # denoted by pos variable
                new_mat[i][pos] = mat[i][j]
                 
                if(j != pos):
                    changed = True
                pos += 1
 
    # returning new compressed matrix
    # and the flag variable.
    return new_mat, changed
 
# function to merge the cells
# in matrix after compressing
def merge(mat):

    rows = len(mat)
    cols = len(mat[0])
     
    changed = False
     
    for i in range(rows):
        for j in range(cols - 1):
 
            # if current cell has same value as
            # next cell in the row and they
            # are non empty then
            if(mat[i][j] == mat[i][j + 1] and mat[i][j] != 0):
 
                # double current cell value and
                # empty the next cell
                mat[i][j] = mat[i][j] * 2
                mat[i][j + 1] = 0
 
                # make bool variable True indicating
                # the new grid after merging is
                # different.
                changed = True
 
    return mat, changed
 
# function to reverse the matrix
# means reversing the content of
# each row (reversing the sequence)
def reverse(mat):

    rows = len(mat)
    cols = len(mat[0])

    new_mat = []
    for i in range(rows):
        new_mat.append([])
        for j in range(cols):
            new_mat[i].append(mat[i][cols-1-j])
    return new_mat
 
# function to get the transpose
# of matrix by rotating 
# 90 degrees left
def transpose_left(mat):

    rows = len(mat)
    cols = len(mat[0])

    new_mat = []
    for i in range(cols):
        new_mat.append([])
        for j in range(rows):
            new_mat[i].append(mat[j][cols-i-1])
    return new_mat

# function to get the transpose
# of matrix by rotating 
# 90 degrees right
def transpose_right(mat):

    rows = len(mat)
    cols = len(mat[0])

    new_mat = []
    for i in range(cols):
        new_mat.append([])
        for j in range(rows):
            new_mat[i].append(mat[rows-j-1][rows-i])
    return new_mat
 
# function to update the matrix
# if we move / swipe left
def move_left(grid):
 
    # first compress the grid
    new_grid, changed1 = compress(grid)
 
    # then merge the cells.
    new_grid, changed2 = merge(new_grid)
     
    changed = changed1 or changed2
 
    # again compress after merging.
    new_grid, temp = compress(new_grid)
 
    # return new matrix and bool changed
    # telling whether the grid is same
    # or different
    return new_grid, changed
 
# function to update the matrix
# if we move / swipe right
def move_right(grid):
 
    # to move right we just reverse
    # the matrix
    new_grid = reverse(grid)
 
    # then move left
    new_grid, changed = move_left(new_grid)
 
    # then again reverse matrix will
    # give us desired result
    new_grid = reverse(new_grid)
    return new_grid, changed
 
# function to update the matrix
# if we move / swipe up
def move_up(grid):
 
    # to move up we just take
    # transpose of matrix
    new_grid = transpose_left(grid)
 
    # then move left (calling all
    # included functions) then
    new_grid, changed = move_left(new_grid)
 
    # again take transpose will give
    # desired results
    new_grid = transpose_right(new_grid)
    return new_grid, changed
 
# function to update the matrix
# if we move / swipe down
def move_down(grid):
 
    # to move down we take transpose
    new_grid = transpose_left(grid)
 
    # move right and then again
    new_grid, changed = move_right(new_grid)
 
    # take transpose will give desired
    # results.
    new_grid = transpose_right(new_grid)
    return new_grid, changed
 
# this file only contains all the logic
# functions to be called in main function
# present in the other file