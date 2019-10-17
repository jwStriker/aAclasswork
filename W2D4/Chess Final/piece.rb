require_relative 'slideable.rb'
require_relative 'stepable.rb'

class Piece
  attr_reader :value, :color, :board
  attr_accessor :position
  def initialize(color, board, position)
    #@value = :*
    @color = color
    @board = board
    @position = position 
  end
end

class Pawn < Piece
  def initialize(color, board, position)
    @value = "p"
    super(color, board, position)
  end 

  def moves(piece = @value)
    mod = {"Red" => 1, "Blue" => -1}[@color]

    x, y = @position
    possible_moves = []

    if (x == 1 && @color == "Red") || (x == 6 && @color == "Blue")
      possible_moves << [x+(mod*2), y] if @board[x+(mod*2)][y].color.nil? && ((x+(mod*2)).between?(0,7) && (y).between?(0,7))
    end

    x += mod
    # y always modded

  

    possible_moves << [x, y-1] if ((x).between?(0,7) && (y-1).between?(0,7)) && @board[x][y-1].value != "-" && @board[x][y-1].color != @color
    possible_moves << [x, y+1] if ((x).between?(0,7) && (y+1).between?(0,7)) && @board[x][y+1].value != "-" && @board[x][y+1].color != @color

    possible_moves << [x, y] if @board[x][y].color.nil? && ((x).between?(0,7) && (y).between?(0,7))
    
    possible_moves
    

  end

  

end 

class Bishop < Piece
  include Slideable 
  def initialize(color, board, position)
    @value = "B"
    super(color, board, position)
  end 
end 

class Rook < Piece
  include Slideable
  def initialize(color, board, position)
    @value = "R"
    super(color, board, position)
  end 
end 

class Queen < Piece
  include Slideable
  def initialize(color, board, position)
    @value = "Q"
    super(color, board, position)
  end 
end 

class King < Piece
  include Stepable
  def initialize(color, board, position)
    @value = "K"
    super(color, board, position)
  end 
end 

class Knight < Piece
  include Stepable
  def initialize(color, board, position)
    @value = "k"
    super(color, board, position)
  end 
end 