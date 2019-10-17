require_relative "piece"
require_relative "null_piece"
require "colorize"
require_relative "display"

class Board 

    attr_reader :board, :captured_pieces

    def initialize 
      @board = Array.new(8) { Array.new(8) {[]} }
      @captured_pieces = []
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

    def move_piece(start_pos, end_pos, player_color)
      if self[start_pos].color == player_color
        if self[start_pos].value == "-"
          p start_pos
          p end_pos
          raise "There's no piece here!" 
        end
        raise "Can't move there!" if self[start_pos].color == self[end_pos].color
        raise "Invalid start position!" if start_pos.any? { |coordinate| !coordinate.between?(0,7) }
        raise "Invalid end position!" if end_pos.any? { |coordinate| !coordinate.between?(0,7) }

        piece = self[start_pos]
        if valid_moves(piece).include?(end_pos)
          capture(end_pos)
          self[start_pos].position = end_pos
          self[start_pos], self[end_pos] = self[end_pos], self[start_pos]
        else
          raise "Invalid move!"
        end
      else
        raise "Not your piece!"
      end
    end

    def capture(end_pos)
      @captured_pieces << self[end_pos]
      self[end_pos] = NullPiece.instance()
    end

    def super_move_piece(start_pos, end_pos)
      raise "There's no piece here!" if self[start_pos].is_a?(NullPiece)
      raise "Can't move there!" if self[start_pos].color == self[end_pos].color
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

    def find_king(color)
      @board.each do |row|
        row.each do |piece|
          return piece.position if piece.value == "K" && piece.color == color
        end
      end
    end

    def find_moves(color)
      all_moves = []
      @board.each do |row|
        row.each do |piece|
          if piece.color == color
            begin
              all_moves += piece.moves
            rescue => exception
              next
            end
          end
        end
      end
      all_moves
    end

    def valid_moves(piece)
      #puts piece.value
      array_of_moves = piece.moves
      temp_pos = piece.position
      valid_moves_array = []
      array_of_moves.each do |move_pos|
        super_move_piece(temp_pos, move_pos)
        valid_moves_array << move_pos unless in_check?(piece.color)
        super_move_piece(move_pos, temp_pos)
      end
      valid_moves_array
    end

    def in_check?(color)
      king_pos = find_king(color)
      enemy_color = {"Red" => "Blue", "Blue" => "Red"}[color]
      find_moves(enemy_color).include?(king_pos)
    end

    def checkmate?(color)
      colored_pieces = @board.flatten.map { |piece| piece if piece.color == color }.compact
      #p colored_pieces
      colored_pieces.each do |piece|
        return false if !valid_moves(piece).empty?
      end 
      true
    end

end

# b = Board.new
# b.set_board
# d = Display.new(b)

# d.render
# b.board.reverse!

# d.render

# # b.super_move_piece([6,5],[5,5])
# b.super_move_piece([1,4],[3,4])
# b.super_move_piece([6,6],[4,6])

# b.super_move_piece([0,3],[4,7])
# d.render
# p b.checkmate?("Blue")





# return_val = nil
# while return_val != "quit"
#   d.render
#   return_val = d.cursor.get_input
# end
