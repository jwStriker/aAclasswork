require 'singleton'

class NullPiece < Piece 
  include Singleton
  def initialize
    @value = "-"
  end
    
end 