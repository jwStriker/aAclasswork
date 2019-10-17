class HumanPlayer
  attr_reader :color, :start_pos, :end_pos
  def initialize(cursor, color)
    @cursor = cursor
    @start_pos = [0, 0]
    @end_pos = [0, 0]
    @color = color
  end

  def make_move
    result = @cursor.get_input
    if result == true
      @start_pos = @cursor.cursor_pos.dup
    elsif result == "quit"
      @end_pos = @cursor.cursor_pos.dup
      return "quit"
    end
    return true
  end
end