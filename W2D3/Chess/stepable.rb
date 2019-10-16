module Stepable

    def moves(piece = @value)
        if @value == "K"
           # @value == "K" #King
          moves_possible = []
          [-1,0,1].each do |x_mod|
              [-1,0,1].each do |y_mod|
                  x, y = @position
                  x += x_mod
                  y += y_mod
                  if x.between?(0,7) && y.between?(0,7)
                    moves_possible << [x, y] unless [x, y] == @position
                  end
              end
          end
          pos_x, pos_y = @position
          moves_possible.map do |pos|
            pos if @board[pos[0]][pos[1]].color != @board[pos_x][pos_y].color
          end.compact
        elsif @value == "k"
        #elsif @value == "k" #Knight
          moves_possible = []
          x,y = @position 
          moves_possible << [x+2, y+1] if (x+2).between?(0,7) && (y+1).between?(0,7)
          moves_possible << [x+2, y-1] if (x+2).between?(0,7) && (y-1).between?(0,7)
          moves_possible << [x+1, y+2] if (x+1).between?(0,7) && (y+2).between?(0,7)
          moves_possible << [x+1, y-2] if (x+1).between?(0,7) && (y-2).between?(0,7)
          moves_possible << [x-2, y+1] if (x-2).between?(0,7) && (y+1).between?(0,7)
          moves_possible << [x-2, y-1] if (x-2).between?(0,7) && (y-1).between?(0,7)
          moves_possible << [x-1, y+2] if (x-1).between?(0,7) && (y+2).between?(0,7)
          moves_possible << [x-1, y-2] if (x-1).between?(0,7) && (y-2).between?(0,7)
          pos_x, pos_y = @position
          moves_possible.map do |pos|
            pos if @board[pos[0]][pos[1]].color != @board[pos_x][pos_y].color
          end.compact
        end
    end
end