require_relative 'tic_tac_toe_node'
require "byebug"
class SuperComputerPlayer < ComputerPlayer
  def move(game, mark)
    node = TicTacToeNode.new(game.board, mark)
    moves = node.children
    


    winning_move = moves.find { |child| child.winning_node?(mark) }
    p winning_move
    return winning_move.prev_move_pos if winning_move

    # moves.each do |child|
    #   secwin = child.children.find { |c| c.winning_node?(mark) }
    #   return secwin.prev_move_pos if secwin
    # end

    draw_move = moves.find { |child| !child.losing_node?(mark) } 
    return draw_move.prev_move_pos if draw_move

    raise "error"
  end
end

if __FILE__ == $PROGRAM_NAME
  puts "Play the brilliant computer!"
  hp = HumanPlayer.new("Jeff")
  cp = SuperComputerPlayer.new

  TicTacToe.new(hp, cp).run
end
