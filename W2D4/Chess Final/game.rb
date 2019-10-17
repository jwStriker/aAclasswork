require_relative "board"
require_relative "piece"
require_relative "display"
require_relative "human_player"

class Game

    attr_reader :board, :display, :cursor, :red_player, :blue_player

    def initialize()
        @board = Board.new
        @board.set_board
        @display = Display.new(@board)
        @cursor = @display.cursor
        @red_player = HumanPlayer.new(@cursor, "Red")
        @blue_player = HumanPlayer.new(@cursor, "Blue")
        @current_player = @red_player
        @players = [@red_player, @blue_player]
    end 

    def run 
      begin
        until game_over?
          take_turn
          @current_player = @players[(@players.index(@current_player) + 1) % 2]
          puts @current_player.color
        end
      rescue => exception
        puts exception.message
        retry
      end
      p "Checkmate, #{@current_player.color}!"
    end 

    def game_over?
      @display.render(@current_player.color)
      @board.checkmate?(@current_player.color)
    end

    def take_turn
      begin
        return_val = nil
        until ["quit", "select_quit"].include?(return_val)
          @display.render(@current_player.color)
          return_val = @current_player.make_move
        end
      rescue => exception
        retry
      end

      @board.move_piece(@current_player.start_pos, @current_player.end_pos, @current_player.color)
      ## move logic HERE
    end

end

g = Game.new
g.run

