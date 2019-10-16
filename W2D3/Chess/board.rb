require_relative "piece"
require_relative "null_piece"
require "colorize"

class Board 

    attr_reader :board

    def initialize 
      @board = Array.new(8) { Array.new(8) {[]} }
      #puts @board
    end

    def set_board 
      @board.each_with_index do |row, row_idx|
        if row_idx == 0
          row.each_with_index do |col, col_idx|
            if col_idx == 0 || col_idx == 7 
              self[[row_idx, col_idx]] = Rook.new("Red", @board, [row_idx, col_idx])
            elsif col_idx == 1 || col_idx == 6
              self[[row_idx, col_idx]] = Knight.new("Red", @board, [row_idx, col_idx])
            elsif col_idx == 2 || col_idx == 5
              self[[row_idx, col_idx]] = Bishop.new("Red", @board, [row_idx, col_idx])
            elsif col_idx == 3
              self[[row_idx, col_idx]] = Queen.new("Red", @board, [row_idx, col_idx])
            elsif col_idx == 4
              self[[row_idx, col_idx]] = King.new("Red", @board, [row_idx, col_idx])
            end
          end
          
        elsif row_idx == 1
          row.each_with_index do |col, col_idx|
            self[[row_idx, col_idx]] = Pawn.new("Red", @board, [row_idx, col_idx])
          end

        elsif row_idx == 7
          row.each_with_index do |col, col_idx|
            if col_idx == 0 || col_idx == 7 
              self[[row_idx, col_idx]] = Rook.new("Blue", @board, [row_idx, col_idx])
            elsif col_idx == 1 || col_idx == 6
              self[[row_idx, col_idx]] = Knight.new("Blue", @board, [row_idx, col_idx])
            elsif col_idx == 2 || col_idx == 5
              self[[row_idx, col_idx]] = Bishop.new("Blue", @board, [row_idx, col_idx])
            elsif col_idx == 3
              self[[row_idx, col_idx]] = Queen.new("Blue", @board, [row_idx, col_idx])
            elsif col_idx == 4
              self[[row_idx, col_idx]] = King.new("Blue", @board, [row_idx, col_idx])
            end
          end

        elsif row_idx == 6
          row.each_with_index do |col, col_idx|
            self[[row_idx, col_idx]] = Pawn.new("Blue", @board, [row_idx, col_idx])
          end
        else 
          @board[row_idx] = Array.new(8) { NullPiece.instance() } 
        end
      end
    end

    def move_piece(start_pos, end_pos)
      raise "There's no piece here!" if self[start_pos].is_a?(NullPiece)
      raise "Can't move there!" if self[end_pos].value != "-"
      raise "Invalid start position!" if start_pos.any? { |coordinate| !coordinate.between?(0,7) }
      raise "Invalid end position!" if end_pos.any? { |coordinate| !coordinate.between?(0,7) }

      piece = self[start_pos]
      if piece.moves.include?(end_pos)
        self[start_pos].position = end_pos
        self[start_pos], self[end_pos] = self[end_pos], self[start_pos]
      end
    end

    def super_move_piece(start_pos, end_pos)
      raise "There's no piece here!" if self[start_pos].is_a?(NullPiece)
      raise "Can't move there!" if self[end_pos].value != "-"
      raise "Invalid start position!" if start_pos.any? { |coordinate| !coordinate.between?(0,7) }
      raise "Invalid end position!" if end_pos.any? { |coordinate| !coordinate.between?(0,7) }

      self[start_pos].position = end_pos
      self[start_pos], self[end_pos] = self[end_pos], self[start_pos]
    end

    def [](position)
      x, y = position 
      @board[x][y]
    end

    def []=(position, value)
      x, y = position 
      @board[x][y] = value
    end

    def render
      puts "  " + (0..7).to_a.join(" ")
      @board.each_with_index do |row, row_idx|
        puts "#{row_idx} " + row.map { |piece| piece.color.nil? ? piece.value : (piece.color == "Red" ? piece.value.red : piece.value.blue)}.join(" ")
      end
    end

end

b = Board.new
b.set_board


# b.move_piece([1,7],[2,5])
# b.move_piece([1,3],[2,0])
# b.move_piece([6,6],[4,6])
# b.move_piece([0,2],[1,3])
# b.move_piece([6,7],[5,0])

# p b[[0,7]].moves("h_v")
# p b[[1,3]].moves("both")

# b.move_piece([0,1],[5,3])
# b.move_piece([0,2],[5,2])

b.move_piece([1,3],[2,3])
b.render
b.move_piece([0,3],[1,3])
b.render
# p b[[6,3]].moves("blah")

