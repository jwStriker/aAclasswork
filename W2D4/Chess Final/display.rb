require 'colorize'
require_relative 'cursor'

class Display
  attr_reader :cursor

  def initialize(board)
    @board = board
    @cursor = Cursor.new([0, 0], board)
  end

  def render(player_color)
    #render_board = @board.board
    #render_board = render_board.reverse if player_color == "Red"
    alpha = ('A'..'H').to_a
    puts "  " + alpha.join(" ")
    @board.board.each_with_index do |row, row_idx|
      row_string = ""
      row.each_with_index do |piece, col_idx| 
        if @cursor.cursor_pos == piece.position && !(@board[@cursor.cursor_pos].is_a?(NullPiece))
          row_string += "#{piece.value.green} " if @cursor.color == "green"
          row_string += "#{piece.value.yellow} " if @cursor.color == "yellow"
        else 
          if piece.color.nil? 
            if @board[@cursor.cursor_pos].is_a?(NullPiece) && @cursor.cursor_pos == [row_idx, col_idx]
              row_string += "#{"*".green} " if @cursor.color == "green"
              row_string += "#{"*".yellow} " if @cursor.color == "yellow"
            else
              row_string += "#{piece.value} "
            end
          else
            if piece.color == "Red"
              row_string += "#{piece.value.red} "
            else
              row_string += "#{piece.value.blue} "
            end
          end
        end
      end
      puts "#{8 - row_idx} " + row_string + "#{8 - row_idx}" 
    end
    alpha = ('A'..'H').to_a
    puts "  " + alpha.join(" ")
    puts "\n"
  end
end