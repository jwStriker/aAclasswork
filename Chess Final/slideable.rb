module Slideable 

    def moves(piece = @value)
        total_moves = []
        px, py = @position
        if piece == "B"
          [-1,1].each do |x_val|
            [-1,1].each do |y_val|
              x, y = @position
              break_level = 0
              until (!x.between?(0,7)) || (!y.between?(0,7))
                break if break_level > 1
                x -= x_val
                y -= y_val
                unless @board[x].nil? || @board[x][y].nil?
                    break if break_level > 1
                  unless (!x.between?(0,7)) || (!y.between?(0,7))
                    total_moves << [x, y]
                    if @board[x][y].value != "-"
                      break_level = 2
                      break
                    end
                  end
                end
              end
            end
          end

          pos_x, pos_y = @position
          total_moves = total_moves.map do |pos|
            pos if @board[pos[0]][pos[1]].color != @board[pos_x][pos_y].color
          end.compact

          total_moves
        elsif piece == "R"
          [-1,0,1].each do |x_val|
            {-1 =>[0], 0=>[-1,1], 1=>[0]}[x_val].each do |y_val|
              x, y = @position
              break_level = 0
              until (!x.between?(0,7)) || (!y.between?(0,7))
                break if break_level > 1
                x -= x_val
                y -= y_val
                unless @board[x].nil? || @board[x][y].nil?
                    break if break_level > 1
                  unless (!x.between?(0,7)) || (!y.between?(0,7))
                    total_moves << [x, y]
                    if @board[x][y].value != "-"
                      break_level = 2
                      break
                    end
                  end
                end
              end
            end
          end

          pos_x, pos_y = @position
          total_moves = total_moves.map do |pos|
            pos if @board[pos[0]][pos[1]].color != @board[pos_x][pos_y].color
          end.compact

          total_moves
   
        elsif piece == "Q"
          moves("R") + moves("B")
        end
    end

end
